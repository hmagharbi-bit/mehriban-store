"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalBackground() {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() < 0.2 ? 2 : 1, // 20% are 2px golds, 80% are 1px whites
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Starfield */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        boxShadow: star.size > 1 ? "0 0 6px rgba(212, 175, 55, 0.8)" : "none", // Gold glimmer for larger stars
                        backgroundColor: star.size > 1 ? "#c5a059" : "#ffffff",
                    }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <svg
                className="w-full h-full opacity-40"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Thin Golden Line 1 */}
                <motion.path
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth="0.5"
                    className="drop-shadow-[0_0_10px_rgba(197,160,89,0.3)] opacity-40"
                    animate={{
                        d: [
                            "M-200,800 C300,500 700,1100 1200,800",
                            "M-200,800 C500,1100 700,500 1200,800",
                            "M-200,800 C300,500 700,1100 1200,800"
                        ]
                    }}
                    transition={{ duration: 50, ease: "linear", repeat: Infinity }}
                />

                {/* Thin Golden Line 2 */}
                <motion.path
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth="0.5"
                    className="drop-shadow-[0_0_10px_rgba(197,160,89,0.3)] opacity-30"
                    animate={{
                        d: [
                            "M-200,500 C200,200 800,800 1200,500",
                            "M-200,500 C400,800 600,200 1200,500",
                            "M-200,500 C200,200 800,800 1200,500"
                        ]
                    }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                />
            </svg>
        </div>
    );
}
