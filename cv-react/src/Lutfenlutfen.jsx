// gerekli paketlerin ve modüllerin yüklenmesi
import React from "react";
import Webcam from "react-webcam";
import cv from "@techstark/opencv-js";
import "./styles.css";
import io from 'socket.io-client';
import "regenerator-runtime/runtime.js";
import { renderBoxes } from "./utils.js";

// video karelerini işleyen ve backend'e gönderen fonskiyon
function src_canvas(webcamRef, socket) {
  // video çerçevesinin boyutlarını ayarlanması
    webcamRef.current.video.height = 640;
    webcamRef.current.video.width = 640;
    const modelWidth = 640;
    const modelHeight = 640;

    // canvas bağlamını al
    const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d').willReadFrequently = true;
    const ctx = canvas.getContext('2d', {willReadFrequently: true});

    // yeni bir video çekimi oluşturulması
    const cap = new cv.VideoCapture(webcamRef.current.video);

    // görüntünün işlenmesi için yeni Mat'ların oluşturulması
    const mat = new cv.Mat(modelHeight, modelWidth, cv.CV_8UC4);
    const matC3 = new cv.Mat(modelHeight, modelWidth, cv.CV_8UC3);
  
    // video karelerini işlemek için asenkron fonksiyon
    const processVideo = async () => {
        try {
            // video akışı kapalıysa
            // if (window.streaming === null) {
            // // belleğin temizlenmesi
            // mat.delete();
            // matC3.delete();
            // return;
            // }
            // görüntünün işlenmeye başlanması
            cap.read(mat); // video karesinin okunması
            cv.cvtColor(mat, matC3, cv.COLOR_RGBA2BGR); // RGBA'dan BGR'ye dönüşüm
            // [n x n] boyutunda görüntün doldurulması
            const maxSize = Math.max(matC3.rows, matC3.cols); // genişlik ve yükseklikten maksimumun alınması
            const xPad = maxSize - matC3.cols, // xPadding'in ayarlanması
            xRatio = maxSize / matC3.cols; // xRatio'nun ayarlanması
            const yPad = maxSize - matC3.rows, // yPadding'in ayarlanması
            yRatio = maxSize / matC3.rows; // yRatio'nun ayarlanması
            const matPad = new cv.Mat(); // dolgulu görüntü için yeni matris oluşturulması
            cv.copyMakeBorder(matC3, matPad, 0, yPad, 0, xPad, cv.BORDER_CONSTANT, [0, 0, 0, 255]); // siyah dolgu
            // ön işleme görüntü matrisi
            // cv.cvtColor(matPad, matPad, cv.COLOR_BGR2RGB);
            const input = cv.blobFromImage(
                matPad,
                1 / 255.0,
                new cv.Size(modelWidth, modelHeight),
                new cv.Scalar(0, 0, 0),
                true,
                false
            );
            const array = input.data32F.slice(); // görüntü dizisi 
            // görüntü dizisini arka uca gönderin ve yanıtı yani kutuları bekler
            const boxes = await new Promise((resolve) => {
              socket.emit("videoframe", array, xRatio, yRatio, (boxes) => {
                resolve(boxes);
              });
            }); 
            console.log('boxes: ', boxes);
            renderBoxes(webcamRef, boxes, ctx); // render fonskiyonu yazılacak ve kutuları çizecek
            input.delete(); // clean memory
            // matPad.delete(); // clean memory
            requestAnimationFrame(processVideo); // sonraki kareyi ister
        } catch (err) {
            console.error(err);
        }
    };

    processVideo();
}

//video#cameraInput.webcam
//canvas.outputImage

export default function Lutfenlutfen() {

  // webcam, giriş görüntüsü ve çıkış görüntüsüne referanslar oluşturulması
  const webcamRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const faceImgRef = React.useRef(null);

  // socket io kullanarak sunucuya bağlanılması
  const socket = io.connect('http://localhost:4000', { transports : ['websocket'] });
  
  // Sunucudan model bilgilerini bekler
  socket.on("model-env", (data) => {
    // Model giriş şekline göre tuval şeklini ayarlar
    const [imageWidth, imageHeight] = data.inputShape.slice(2, 4);
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    console.log('imageWidth: ', imageWidth);
  });

  //console.log('1: ', webcamRef);
  //webcam
  //console.log('2: ', imgRef);
  //img#cameraInputasImg.inputImage
  //console.log('3: ', faceImgRef);
  //canvas.outputImage

  React.useEffect(() => {

    // Algılama fonksiyonu
    const detect = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      // Giriş görüntüsü tuvale ve OpenCV Mat'a yüklenir
      return new Promise((resolve) => {
        imgRef.current.src = imageSrc;
        imgRef.current.onload = () => {
          try {
            // Görüntüyü işledikten sonra tuvalde görüntülenir
            src_canvas(webcamRef, socket);
            const img = cv.imread(imgRef.current);
            cv.imshow(faceImgRef.current, img);
            img.delete();
            resolve();
          } catch (error) {
            // console.log(error);
            resolve();
          }
        };
      });
    };

    let handle;
    const delay = 2000; // Delay in milliseconds
    const nextTick = () => {
      handle = requestAnimationFrame(async () => {
        await detect();
        setTimeout(() => {
          nextTick();
        }, delay);
      });
    };
    nextTick();
    return () => {
      cancelAnimationFrame(handle);
    };
  }, []);

  return (
    <div className="App">
      <h2>Gerçek zamanlı insan sayma</h2>
      <Webcam
        id="cameraInput"
        ref={webcamRef}
        className="webcam"
        screenshotFormat="image/jpeg"
      />
      <img id="cameraInputasImg" className="inputImage" alt="input" ref={imgRef} />
      <canvas id="canvas" className="outputImage" ref={faceImgRef} />
      {<div>Arayüz tasarlanacak</div>}
    </div>
  );
}
