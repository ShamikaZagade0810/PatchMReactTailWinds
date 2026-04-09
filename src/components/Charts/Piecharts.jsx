// import React from "react";
import React, { useState } from "react";
import { PieChart, Pie, Sector, Tooltip, ResponsiveContainer, } from "recharts";
import { Cell } from "recharts";

// Custom active shape
const COLORS = ["#ff4d4f", "#fa8c16", "#fadb14", "#52c41a"];
const renderActiveShape = (props,) => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle || 0));
    const cos = Math.cos(-RADIAN * (midAngle || 0));

    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    const textAnchor = cos >= 0 ? "start" : "end";


    return (
        <g>
            {/* Center Label */}
            {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text> */}

            {/* Main Sector */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            {/* Outer Highlight */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            {/* Line */}
            {/* <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            /> */}

            {/* <circle cx={ex} cy={ey} r={3} fill={fill} /> */}

            {/* Value */}
            <text x={ex} y={ey} textAnchor={textAnchor} fill="#333">
                {value}
            </text>

            {/* Percentage */}
            {/* <text x={ex} y={ey + 15} textAnchor={textAnchor} fill="#999">
                {(percent * 100).toFixed(2)}%
            </text> */}
        </g>
    );
};

// Main Component
const PieCharts = ({ data, isAnimationActive = true }) => {
    const [centerValue, setCenterValue] = useState(
        data.reduce((sum, item) => sum + item.value, 0)
    );
    const [centerLabel, setCenterLabel] = useState("Total Tasks");
    const [centerColor, setCenterColor] = useState("#ffffff"); // default white
    return (
        <div className="flex flex-col items-center w-full">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        activeShape={renderActiveShape}
                        isAnimationActive={isAnimationActive}
                        onMouseEnter={(entry, index) => {
                            setCenterValue(entry.value);
                            setCenterLabel(entry.name);
                            setCenterColor(COLORS[index % COLORS.length]); // set color to slice color
                        }}
                        onMouseLeave={() => {
                            setCenterValue(data.reduce((sum, item) => sum + item.value, 0));
                            setCenterLabel("Total Tasks");
                        }}
                        cornerRadius={3} // ✅ rounded edges
                        paddingAngle={4}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    {/* <Tooltip /> */}
                    <circle cx="50%" cy="50%" r={45} fill="#1E283D" />
                    {/* Center circle with value and label */}
                    <text
                        x="50%"
                        y="47%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={25}
                        fill="#ffffff"
                    >
                        {centerValue}
                    </text>
                    <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={12}
                        fill={centerColor}
                    >
                        {centerLabel}
                    </text>
                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};

export default PieCharts;