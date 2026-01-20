import React, { useEffect, useRef } from 'react';

interface ImageSequenceProps {
    totalFrames: number;
    frameRate?: number;
    className?: string; // For styling the logic wrapper or canvas
    onFrameChange?: (frame: number) => void;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({
    totalFrames,
    frameRate = 24,
    className = "",
    onFrameChange
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const requestRef = useRef<number>();
    const frameIndexRef = useRef(1); // Start at 1
    const lastFrameTimeRef = useRef(0);

    // Preload all images on mount
    useEffect(() => {
        // Clear previous images if any
        imagesRef.current = [];

        // Start loading all frames
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameString = i.toString().padStart(5, '0');
            img.src = `/${frameString}.png`;
            imagesRef.current[i] = img; // Store at index i (1-based)
        }

        return () => {
            // Cleanup if needed, though browsers handle image garbage collection
            imagesRef.current = [];
        };
    }, [totalFrames]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set high resolution for crisp rendering
        const updateCanvasSize = () => {
            canvas.width = 1920;
            canvas.height = 1080;
        };
        updateCanvasSize();

        const render = (time: number) => {
            if (!lastFrameTimeRef.current) lastFrameTimeRef.current = time;

            const deltaTime = time - lastFrameTimeRef.current;
            const interval = 1000 / frameRate;

            if (deltaTime > interval) {
                // Get the image for the current frame
                const currentImg = imagesRef.current[frameIndexRef.current];

                if (currentImg && currentImg.complete) {
                    // Only draw and advance if the image is ready
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);

                    // Notify frame change
                    if (onFrameChange) onFrameChange(frameIndexRef.current);

                    // Advance frame
                    frameIndexRef.current = (frameIndexRef.current % totalFrames) + 1;

                    // Adjust time to maintain consistent framerate
                    lastFrameTimeRef.current = time - (deltaTime % interval);
                }
            }

            requestRef.current = requestAnimationFrame(render);
        };

        requestRef.current = requestAnimationFrame(render);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [frameRate, totalFrames, onFrameChange]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover ${className}`}
        />
    );
};
