// // Add text to image using canvas
// //https://stackoverflow.com/questions/40444632/add-text-to-image-using-typescript#:~:text=var%20canvas%20%3D%20document.getElementById%20%28%27myCanvas%27%29%20as%20HTMLCanvasElement%3B%20var,%28%22My%20TEXT%21%22%2C%20100%2C%20200%29%3B%20%7D%3B%20imageObj.src%20%3D%20%27http%3A%2F%2Fwww.html5canvastutorials.com%2Fdemos%2Fassets%2Fdarth-vader.jpg%27%3B
"use client";
import React, { useRef, useEffect  } from 'react'

const Canvas = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLCanvasElement> & React.CanvasHTMLAttributes<HTMLCanvasElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        const imageObj = new Image();
        imageObj.onload = function () {
            if (context && canvas){
                context.drawImage(imageObj, 0, 0);
                context.font = "30px Arial";
                context.fillStyle = "white";
                // add text at bottom of image
                const fontSize = 30;
                context.fillStyle = 'red';
                context.textAlign = 'center';
                const textX = canvas.width / 2;
                const textY = canvas.height - fontSize;
                context.fillText("Hello World", textX, textY);                
            }
        };
        imageObj.src = "https://replicate.delivery/pbxt/REYu70RXyK6GHFp8h6LuBTLJZnCUX01VyqAM9ZefPwfkzthiA/out-0.png";
        if (canvas) {
            canvas.width = imageObj.width;
            canvas.height = imageObj.height;
        }
    }, [])

    return <canvas ref={canvasRef} {...props} width="500" height="500" />
}

export default Canvas
