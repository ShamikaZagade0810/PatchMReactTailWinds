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


const SingleBarcharts = () => {

const patchHistory = [
  { month: "Jan 8-14", count: 38 },
  { month: "Jan 15-21", count: 45 },
  { month: "Jan 22-28", count: 32 },
  { month: "Feb 1-7", count: 50 },
  { month: "Feb 8-14", count: 42 },
  { month: "Feb 15-21", count: 25 },
  { month: "Feb 22-28", count: 37 },
  { month: "Mar 1-7", count: 33 },
  { month: "Mar 8-14", count: 60 },
  { month: "Mar 15-21", count: 38 },
  { month: "Mar 22-28", count: 31 },
  { month: "Apr 1-7", count: 55 },
  { month: "Apr 8-14", count: 35 },
  { month: "Apr 15-21", count: 42 },
  { month: "Apr 22-28", count: 22 },
  { month: "Apr 30-May 6", count: 33 },
  { month: "May 7-13", count: 26 },
  { month: "May 14-18", count: 43 },
];

    return (
        <div className="w-full h-56 bg-[#141D2E] rounded-lg p-3">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patchHistory}>

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