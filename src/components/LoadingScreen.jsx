import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onFinish }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-deep-sea flex flex-col items-center justify-center"
        >
            {/* Animated Logo/Initials */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-frost text-6xl font-black tracking-tighter mb-8"
            >
                AT
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 h-[2px] bg-frost/10 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-lavender to-transparent"
                />
            </div>

            {/* The Caption */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-frost/40 font-mono text-[16px] uppercase tracking-[0.3em]"
            >
                Best viewed on desktop
            </motion.p>
        </motion.div>
    );
};

export default LoadingScreen;