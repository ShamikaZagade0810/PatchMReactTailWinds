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


const SingleBarcharts = ({ data ,onSliceClick}) => {

const getMonthDateRange = (monthName, year = new Date().getFullYear()) => {
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0); // last day of month

    const format = (date) =>
        date.toISOString().split("T")[0]; // YYYY-MM-DD

    return {
        startDate: format(startDate),
        endDate: format(endDate)
    };
};

    return (
        <div className="w-full h-60 bg-[#141D2E] rounded-lg p-3">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>

                    {/* Grid */}
                    <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />

                    {/* X Axis */}
                    <XAxis
                        dataKey="month"
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF", fontSize: 14 }}
                        
                    />

                    {/* Y Axis */}
                    <YAxis
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF", fontSize: 13 }}
                    />

                    {/* Tooltip */}
                    <Tooltip    
                        contentStyle={{
                            backgroundColor: "#0F172A",
                            border: "1px solid #1E293B",
                            borderRadius: "6px",
                            color: "#fff",
                            fontSize: "14px",
                            
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
                        onClick={(data, index) => {
                            console.log("Clicked Bar:", data);
                            const { startDate, endDate } = getMonthDateRange(data.month);
                            const reqdata = {
                                fromDate: startDate,
                                toDate: endDate
                            };
                            

                          onSliceClick('patch_wise', 'histbarchart',reqdata);
                       
                        }}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SingleBarcharts