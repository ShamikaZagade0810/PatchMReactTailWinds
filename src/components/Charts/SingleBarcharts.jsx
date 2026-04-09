import React from 'react'
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, PieChart,
    Pie,
    Cell, BarChart,
    Bar,
    CartesianGrid, Legend
} from "recharts";


const SingleBarcharts = ({data}) => {



    return (
        <div className="w-full h-56 bg-[#141D2E] rounded-lg p-3">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>

                    {/* Grid */}
                    <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />

                    {/* X Axis */}
                    <XAxis
                        dataKey="month"
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    />

                    {/* Y Axis */}
                    <YAxis
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0F172A",
                            border: "1px solid #1E293B",
                            borderRadius: "6px",
                            color: "#fff"
                        }}
                        labelStyle={{ color: "#9CA3AF" }}
                    />

                    {/* Remove legend if not needed */}
                    {/* <Legend /> */}

                    {/* Bars */}
                    <Bar
                        dataKey="count"
                        fill="#22C55E"
                        radius={[4, 4, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SingleBarcharts