'use client';
import { useEffect } from 'react';
import fluidCursor from '@/hooks/use-FluidCursor';
const CustomCursor = () => {
    useEffect(() => {
        fluidCursor();
    }, []);
    return (
        <div className="fixed top-0 left-0 z-2">
            <canvas id="fluid" className="w-screen h-screen" />
        </div>
    );
};
export default CustomCursor;
