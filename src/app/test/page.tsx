// Add text to image using canvas
//https://stackoverflow.com/questions/40444632/add-text-to-image-using-typescript#:~:text=var%20canvas%20%3D%20document.getElementById%20%28%27myCanvas%27%29%20as%20HTMLCanvasElement%3B%20var,%28%22My%20TEXT%21%22%2C%20100%2C%20200%29%3B%20%7D%3B%20imageObj.src%20%3D%20%27http%3A%2F%2Fwww.html5canvastutorials.com%2Fdemos%2Fassets%2Fdarth-vader.jpg%27%3B
"use client";
import React, { useRef, useEffect } from "react";

const Canvas = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLCanvasElement> &
    React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const imageObj = new Image();
    imageObj.crossOrigin = "Anonymous";

    imageObj.onload = function () {
      creationOfImage(context, canvas, imageObj);
    };
    imageObj.src =
      "https://replicate.delivery/pbxt/ct83QsMwsIoIGlt34fzEzKcBNEKtNvAdaFU4ipQKfK4UfkjiA/out-0.png";
    if (canvas) {
      canvas.width = imageObj.width;
      canvas.height = imageObj.height;
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas;

function creationOfImage(
  context: CanvasRenderingContext2D | null | undefined,
  canvas: HTMLCanvasElement | null,
  imageObj: HTMLImageElement
) {
  if (context && canvas) {
    context.drawImage(imageObj, 0, 0);
    // Get the image and analyze the background color
    const width =
      imageObj.width || imageObj.naturalWidth || imageObj.offsetWidth;
    const height =
      imageObj.height || imageObj.naturalHeight || imageObj.offsetHeight;
    console.log({ width, height });
    // Step 1: Get the image data and analyze the background color
    const luminance = getLuminance(context, width, height);

    // Check if the background is dark or light
    const textColor = luminance > 0.5 ? "black" : "white";

    // Text
    const text = "Knowing your own darkness";
    let fontSize = defineTextSize(context, canvas, text);

    // add text at bottom of image
    context.font = fontSize + "px Arial";
    context.fillStyle = textColor;
    context.textAlign = "center";
    const textX = canvas.width / 2;
    const textY = canvas.height - fontSize;
    context.fillText(text, textX, textY);
  }
}

function defineTextSize(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string
) {
  const maxFontSize = 30;
  const minFontSize = 10;
  let fontSize = maxFontSize;
  let textWidth;
  do {
    context.font = fontSize + "px Arial";
    textWidth = context.measureText(text).width;
    fontSize--;
  } while (textWidth > canvas.width && fontSize > minFontSize);
  return fontSize;
}

function getLuminance(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const imageData = context.getImageData(0, 0, width, height);
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    totalRed += imageData.data[i];
    totalGreen += imageData.data[i + 1];
    totalBlue += imageData.data[i + 2];
  }

  const averageRed = totalRed / (imageData.data.length / 4);
  const averageGreen = totalGreen / (imageData.data.length / 4);
  const averageBlue = totalBlue / (imageData.data.length / 4);
  console.log({ averageRed, averageGreen, averageBlue });

  // Step 2: Calculate the luminance to determine the optimal text color
  const luminance =
    (0.299 * averageRed + 0.587 * averageGreen + 0.114 * averageBlue) / 255;
  return luminance;
}
