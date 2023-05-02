import React from "react";
import Webcam from "react-webcam";
import cv from "@techstark/opencv-js";
import "./styles.css";

function src_canvas(webcamRef) {
    webcamRef.current.video.height = 640;
    webcamRef.current.video.width = 640;
    const modelWidth = 640;
    const modelHeight = 640;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const cap = new cv.VideoCapture(webcamRef.current.video);
    const mat = new cv.Mat(modelHeight, modelWidth, cv.CV_8UC4);
    const matC3 = new cv.Mat(modelHeight, modelWidth, cv.CV_8UC3);
    console.log('ctx: ', ctx);
    console.log('cap: ', cap);
    console.log('map: ', mat);
    console.log('matC3: ', matC3);

    try {
        // if streaming is off
        if (window.streaming === null) {
          // clean memory.
          mat.delete();
          matC3.delete();
          return;
        }
        // start processing.
        cap.read(mat); // read video frame
        cv.cvtColor(mat, matC3, cv.COLOR_RGBA2BGR); // RGBA to BGR
  
        // padding image to [n x n] dim
        const maxSize = Math.max(matC3.rows, matC3.cols); // get max size from width and height
        const xPad = maxSize - matC3.cols, // set xPadding
          xRatio = maxSize / matC3.cols; // set xRatio
        const yPad = maxSize - matC3.rows, // set yPadding
          yRatio = maxSize / matC3.rows; // set yRatio
        const matPad = new cv.Mat(); // new mat for padded image
        cv.copyMakeBorder(matC3, matPad, 0, yPad, 0, xPad, cv.BORDER_CONSTANT, [0, 0, 0, 255]); // padding black
  
        const input = cv.blobFromImage(
          matPad,
          1 / 255.0,
          new cv.Size(modelWidth, modelHeight),
          new cv.Scalar(0, 0, 0),
          true,
          false
        ); // preprocessing image matrix
  
        const array = input.data32F.slice(); // image array
        // const boxes = new Promise((resolve) => {
        //   socket.emit("videoframe", array, xRatio, yRatio, (boxes) => {
        //     resolve(boxes);
        //   });
        // }); // send image array to backend and await response (boxes)
        // renderBoxes(boxes, ctx); // render boxes
        // input.delete(); // clean memory
  
        requestAnimationFrame(processVideo); // request next frame
      } catch (err) {
        console.error(err);
      }
}

//video#cameraInput.webcam
//canvas.outputImage

export default function Berkozel() {

  const webcamRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const faceImgRef = React.useRef(null);

  //console.log('1: ', webcamRef);
  //webcam
  //console.log('2: ', imgRef);
  //img#cameraInputasImg.inputImage
  //console.log('3: ', faceImgRef);
  //canvas.outputImage

  React.useEffect(() => {
    const detect = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;
      
      return new Promise((resolve) => {
        imgRef.current.src = imageSrc;
        imgRef.current.onload = () => {
          try {
            src_canvas(webcamRef, faceImgRef);
            const img = cv.imread(imgRef.current);
            cv.imshow(faceImgRef.current, img);

            img.delete();
            resolve();
          } catch (error) {
            console.log(error);
            resolve();
          }
        };
      });
    };

    let handle;
    const nextTick = () => {
      handle = requestAnimationFrame(async () => {
        await detect();
        nextTick();
      });
    };
    nextTick();
    return () => {
      cancelAnimationFrame(handle);
    };
  }, []);

  return (
    <div className="App">
      <h2>Real-time Face Detection</h2>
      <Webcam
        id="cameraInput"
        ref={webcamRef}
        className="webcam"
        mirrored
        screenshotFormat="image/jpeg"
      />
      <img id="cameraInputasImg" className="inputImage" alt="input" ref={imgRef} />
      <canvas id="canvas" className="outputImage" ref={faceImgRef} />
      {<div>Sen ne anlation be abi</div>}
    </div>
  );
}
