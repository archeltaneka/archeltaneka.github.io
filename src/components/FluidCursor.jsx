'use client';
import { useEffect, useState } from 'react';
import fluidCursor from '../hooks/use-FluidCursor';

const FluidCursor = () => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // 1. Check if it's a desktop device (No touch + Large Screen)
        const isDesktop = !('ontouchstart' in window) && window.innerWidth > 1024;

        if (isDesktop) {
            setShouldRender(true);
        }
    }, []);

    useEffect(() => {
        // 2. Only initialize the script after the component has rendered the canvas
        if (shouldRender) {
            // Small timeout ensures the DOM element <canvas id="fluid"> actually exists
            const timer = setTimeout(() => {
                fluidCursor();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [shouldRender]);

    if (!shouldRender) return null;

    return (
        <div className="fixed top-0 left-0 z-[1] pointer-events-none">
            <canvas
                id="fluid"
                className="w-screen h-screen opacity-60"
                style={{ mixBlendMode: 'screen' }}
            />
        </div>
    );
};

export default FluidCursor;