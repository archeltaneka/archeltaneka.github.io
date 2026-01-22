'use client';
import { useEffect } from 'react';
import fluidCursor from '../hooks/use-FluidCursor';

const FluidCursor = () => {
    useEffect(() => {
        fluidCursor();
    }, []);

    return (
        /* Added pointer-events-none here so clicks pass through to the buttons below */
        <div className="fixed top-0 left-0 z-2 pointer-events-none">
            <canvas id="fluid" className="w-screen h-screen" />
        </div>
    );
};

export default FluidCursor;