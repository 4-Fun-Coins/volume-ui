import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const { draw, ...rest } = props;
    const canvasRef = useRef(null);

    let init = false;

    useEffect(() => {
        const canvas = canvasRef.current;

        const resizeCanvas = () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        }

        if (!init) {
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            init = true;
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
    }, [draw]);

    return <canvas ref={canvasRef} {...rest}> Your browser does not support canvas </canvas>
}

export default Canvas;