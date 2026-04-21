import React from 'react'

export default function PatchGauge() {
    const score = 741;
    const max = 1000;

    const percent = score / max; // 0 → 1

    const radius = 80;
    const stroke = 20;

    const circumference = 2 * Math.PI * radius;




    const gap = 30; // gap size
    const progress = 80;

    const offset = circumference - (progress / 100) * circumference;
    return (
        <div className=" dark:bg-[#121A2B] rounded-lg p-4 text-white">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-[3px] h-4 bg-blue-500"></div>
                <span className="text-sm text-gray-300">
                  Agent Status
                </span>
            </div>

            {/* Gauge */}
            <div className="relative flex justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200">

                    {/* Background Circle (full ring base) */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth={18}
                        strokeLinecap="round"
                        strokeDasharray="420.2 502.4"
                        transform="rotate(-238 100 100)"
                    />

                    {/* Progress Circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#8b9cfb"
                        strokeWidth={18}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-238 100 100)"
                        style={{ transition: "stroke-dashoffset 0.8s ease" }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute top-10 flex flex-col items-center">
                    <span className="text-xs text-gray-400">score</span>
                    <span className="text-2xl font-semibold">{score}</span>
                    <span className="text-[10px] bg-red-600/20 text-red-400 px-2 rounded">
                        • High
                    </span>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="flex justify-between mt-4 text-xs text-gray-400">
                <div className="text-center">
                    <div className="text-white text-sm">741</div>
                    <div>Configured</div>
                </div>

                <div className="text-center">
                    <div className="text-white text-sm">391</div>
                    <div>Not Configured</div>
                </div>
            </div>
        </div>



    );
}