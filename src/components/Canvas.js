import React, { useRef, useEffect, useState } from 'react'

const Canvas = props => {

    const { draw, ...rest } = props;
    const canvasRef = useRef(null);

    const [init,setInit] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;

        const resizeCanvas = () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        }

        if (!init) {
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            setInit(true);
        }

        const context = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId;

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw,init]);

    return <canvas ref={canvasRef} {...rest}> Your browser does not support canvas </canvas>
}

export default Canvas;