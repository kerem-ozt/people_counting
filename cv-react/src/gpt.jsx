import React, { useRef, useEffect, useState } from "react";
// import { renderBoxes } from "./utils.js";

const App2 = () => {
  // const [modelInputShape, setModelInputShape] = useState(null);
  const [streaming, setStreaming] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const containerRef = useRef(null);

  // const socketRef = useRef(io());

  const detect = () => {
    const src = videoRef.current;
    const canvas = canvasRef.current;
    // const socket = socketRef.current;
    console.log('test');
    const ctx = canvas.getContext("2d");
    // const [modelWidth, modelHeight] = modelInputShape.slice(2, 4);

    const modelWidth = 640;
    const modelHeight = 640;

    const cap = new cv.VideoCapture(src);
    const mat = new cv.Mat(src.height, src.width, cv.CV_8UC4);
    const matC3 = new cv.Mat(src.height, src.width, cv.CV_8UC3);

    const processVideo = async () => {
      try {
        if (streaming === null) {
          mat.delete();
          matC3.delete();
          return;
        }

        cap.read(mat);
        cv.cvtColor(mat, matC3, cv.COLOR_RGBA2BGR);

        const maxSize = Math.max(matC3.rows, matC3.cols);
        const xPad = maxSize - matC3.cols,
          xRatio = maxSize / matC3.cols;
        const yPad = maxSize - matC3.rows,
          yRatio = maxSize / matC3.rows;
        const matPad = new cv.Mat();
        cv.copyMakeBorder(matC3, matPad, 0, yPad, 0, xPad, cv.BORDER_CONSTANT, [0, 0, 0, 255]);

        const input = cv.blobFromImage(
          matPad,
          1 / 255.0,
          new cv.Size(modelWidth, modelHeight),
          new cv.Scalar(0, 0, 0),
          true,
          false
        );

        const array = input.data32F.slice();
        // const boxes = await new Promise((resolve) => {
        //   socket.emit("videoframe", array, xRatio, yRatio, (boxes) => {
        //     resolve(boxes);
        //   });
        // });
        console.log(array);
        // renderBoxes(boxes, ctx);
        input.delete();

        requestAnimationFrame(processVideo);
      } catch (err) {
        console.error(err);
      }
    };

    processVideo();
  };

  return (
    <div>
      <video ref={videoRef} id="video" />
      <button onClick={() => detect(videoRef.current)}>Call myFunction</button>
    </div>
  );
  const videoElement = document.getElementById("video"); // get the video element
  const canvasElement = document.getElementById("canvas"); // get the canvas element

  detect(videoElement, canvasElement, socket);

};



export default App2;