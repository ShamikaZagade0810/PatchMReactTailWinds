import React, { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    Area,
    Scatter,
    AreaChart,
    RadialBarChart,
    RadialBar
} from "recharts";
import { Modal } from '../components/Layout/Modal'
import {
    getThirdPartyPatchCount,
    getThirdPartyMonthlyPatchLine,
    getThirdPartyAppPatchStatusBar,
    getThirdPartyIPPatchStatusChart,
    getThirdPartyTopRiskyDevices,
    getRequiredSeverityBar,
    getThirdPatchCountListing,
    getThirdTotAppsListing,
    getThirdUpToDateAppsListing,
    getThirdOutDatedAppsListing,
    getThirdMonthltPatchList,
    getThirdAppWisePatchList

} from "../api/projectApi";
import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    TrendingUp,
    Loader,
    Package,
    ShieldCheck,
    AlertCircle
} from "lucide-react";




const ThirdPartyDashboard = () => {

    const [patchesCount, setPatchesCount] = useState([]);
    const [monthlyPatchLine, setMonthlyPatchLine] = useState([]);
    const [thirdPartyAppPatchStatus, setThirdPartyAppPatchStatus] = useState([]);
    const [thirdPartyIPPatchStatusChart, setThirdPartyIPPatchStatusChart] = useState([]);
    const [thirdPartyTopRiskyDevices, setThirdPartyTopRiskyDevices] = useState([]);
    const [requiredSeverityBar, setRequiredSeverityBar] = useState([]);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);


    const colorMap = {
        green: "bg-green-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
    };

    useEffect(() => {
        console.log("Hello World");
        apiCalls();


    }, []);


    const apiCalls = async () => {
        try {
            const [
                patchesRes,
                MonthlyPatchLineRes,
                ThirdPartyAppPatchStatusRes,
                ThirdPartyIPPatchStatusChartRes,
                ThirdPartyTopRiskyDevicesRes,
                RequiredSeverityBarRes,
            ] = await Promise.all([
                getThirdPartyPatchCount(),
                getThirdPartyMonthlyPatchLine(),
                getThirdPartyAppPatchStatusBar(),
                getThirdPartyIPPatchStatusChart(),
                getThirdPartyTopRiskyDevices(),
                getRequiredSeverityBar()

            ]);

            console.log("Patch response ", patchesRes.data.data);
            setPatchesCount(patchesRes.data.data);
            setMonthlyPatchLine(MonthlyPatchLineRes.data.data);
            setThirdPartyAppPatchStatus(ThirdPartyAppPatchStatusRes.data.data);
            setThirdPartyIPPatchStatusChart(ThirdPartyIPPatchStatusChartRes.data.data);
            setThirdPartyTopRiskyDevices(ThirdPartyTopRiskyDevicesRes.data.data);
            setRequiredSeverityBar(RequiredSeverityBarRes.data.data);
        } catch (error) {
            console.error("API Error:", error);
        }
    };



    const apiMapping = {
        dashboardCount: {
            missing: getThirdPatchCountListing,
            Completed: getThirdPatchCountListing,
            Failed: getThirdPatchCountListing,
            Pending: getThirdPatchCountListing,
            totalapps: getThirdTotAppsListing,
            uptodate: getThirdUpToDateAppsListing,
            outdated: getThirdOutDatedAppsListing

            // getThirdTotAppsListing,
            // getThirdUpToDateAppsListing,
            // getThirdOutDatedAppsListing

        },
        linechart: {
            pending: getThirdMonthltPatchList ,
            completed:getThirdMonthltPatchList ,
            failed:getThirdMonthltPatchList ,
        },
        barchart :{
            appwise :getThirdAppWisePatchList
        }

    };



    const handleClickModal = async (section, label) => {

        console.log(section, label);
        setLoading(true);
        const data = await apiMapping[section][label]();
        console.log("data --> ", data);
        let MainData = data.data.data[0].data;
        let ColumnData = data.data.data[0].column;
        console.log("Maindata --> ", MainData);
        console.log("ColumnData --> ", ColumnData);
        let obj = {};
        obj.maindata = MainData;
        obj.columndata = ColumnData;
        obj.modelHeading = label.toUpperCase();

        setModalData(obj);



        setShow(true);
        setLoading(false);
    }

    const handleClickModalParameter = async (section, label, inputData) => {

        console.log(section, label);
        setLoading(true);
        const data = await apiMapping[section][label](inputData);
        console.log("data --> ", data);
        let MainData = data.data.data[0].data;
        let ColumnData = data.data.data[0].column;
        console.log("Maindata --> ", MainData);
        console.log("ColumnData --> ", ColumnData);
        let obj = {};
        obj.maindata = MainData;
        obj.columndata = ColumnData;
        obj.modelHeading = label.toUpperCase();

        setModalData(obj);



        setShow(true);
        setLoading(false);
    }


    const handleClick = (parent, child) => {
        console.log('Parent ', parent, 'child ', child);

        if (child == 'totalapps' || child == 'uptodate' || child == 'outdated') {
            handleClickModal(parent, child);
        } else {
            let req = {
                "status": child
            }

            handleClickModalParameter(parent, child, req);
        }
    }


    const handleChartClick = (state) => {
        if (state && state.activePayload) {
            const data = state.activePayload[0].payload;
            console.log("Clicked Data:", data);

            // Example:
            // data.name → month
            // data.pending / completed / failed
        }
    };

    const data = [
        { name: "2016-1", a: 150, b: 120, c: 80 },
        { name: "2016-3", a: 140, b: 110, c: 100 },
        { name: "2016-5", a: 90, b: 120, c: 110 },
        { name: "2016-7", a: 40, b: 90, c: 60 },
        { name: "2016-9", a: 30, b: 60, c: 30 },
        { name: "2016-11", a: 120, b: 30, c: 60 },
    ];


    const dataPatchStatusDayWise = [
        { day: "1", a: 40, b: 20 },
        { day: "2", a: 60, b: 30 },
        { day: "3", a: 30, b: 10 },
        { day: "4", a: 70, b: 40 },
        { day: "5", a: 25, b: 15 },
        { day: "6", a: 50, b: 20 },
        { day: "7", a: 65, b: 35 },
        { day: "8", a: 45, b: 25 },
        { day: "9", a: 55, b: 20 },
        { day: "10", a: 30, b: 15 },
        { day: "11", a: 35, b: 20 },
        { day: "12", a: 30, b: 10 },
        { day: "13", a: 40, b: 20 },
    ];


    const dataAppGettingPatched = [
        { month: "Jul", green: 70, white: 10, gray: 20 },
        { month: "Jun", green: 65, white: 5, gray: 30 },
        { month: "May", green: 40, white: 20, gray: 40 },
        { month: "Apr", green: 55, white: 15, gray: 30 },
        { month: "Mar", green: 80, white: 15, gray: 25 },
        { month: "Feb", green: 30, white: 10, gray: 20 },
        { month: "Jan", green: 50, white: 10, gray: 30 },
    ];
    const highlightPoints = [
        { name: "8", value: 170 },
        { name: "10", value: 310 },
        { name: "12", value: 220 },
        { name: "13", value: 260 },
    ];

    const topRiskyDevice = [
        { ip: "10.30.13.60", patches: 10, updated: "0d Ago", severity: "Medium" },
        { ip: "10.30.13.60", patches: 4, updated: "0d Ago", severity: "Critical" },
        { ip: "10.30.13.60", patches: 1, updated: "88d Ago", severity: "Critical" },
        { ip: "10.30.13.60", patches: 0, updated: "88d Ago", severity: "Critical" },
    ];

    const severityMap = {
        Medium: "bg-yellow-500/20 text-yellow-400",
        Critical: "bg-red-500/20 text-red-400",
    };

    const PacketProgress = [
        { name: "1", value: 30 },
        { name: "2", value: 20 },
        { name: "3", value: 25 },
        { name: "4", value: 50 },
        { name: "5", value: 45 },
        { name: "6", value: 70 },
        { name: "7", value: 60 },
    ];

    const radialData = [
        { name: "A", value: 80, fill: "#22c55e" },
        { name: "B", value: 70, fill: "#3b82f6" },
        { name: "C", value: 60, fill: "#f97316" },
        { name: "D", value: 50, fill: "#ef4444" },
    ];

    const IpwiseData = [
        {
            IPAddress: "10.30.13.60",
            success: 50,
            failed: 10,
            pending: 20

        },
        {
            IPAddress: "10.30.13.60",
            success: 50,
            failed: 10,
            pending: 20
        },
        {
            IPAddress: "10.30.13.60",
            success: 50,
            failed: 11,
            pending: 20
        },
        {
            IPAddress: "10.30.13.60",
            success: 50,
            failed: 10,
            pending: 20
        },
        {
            IPAddress: "10.30.13.60",
            success: 50,
            failed: 10,
            pending: 20
        }
    ]

    const DashboardsCount = {
        "Missing Patch": { color: "yellow", icon: AlertTriangle },
        "Completed": { color: "purple", icon: CheckCircle },
        "Failed": { color: "blue", icon: XCircle },
        "Success Rate": { color: "orange", icon: TrendingUp },
        "In Progress": { color: "purple", icon: Loader },
        "Total Apps": { color: "blue", icon: Package },
        "Up to date Apps": { color: "blue", icon: ShieldCheck },
        "Outdated Apps": { color: "purple", icon: AlertCircle },
    };


    const SeverityCount = {
        CRITICAL: { label: "Critical", value: 20, color: "green" },
        HIGH: { label: "High", value: 40, color: "red" },
        MEDIUM: { label: "Medium", value: 12, color: "yellow" },
        LOW: { label: "Low", value: 8, color: "blue" },
        UNKNOWN: { label: "Low", value: 8, color: "blue" }
    };




    return (
        <div className="mb-1 bg-white dark:bg-[#0B1220] ">
            <div className="grid grid-cols-12 gap-2 p-1 bg-[#020617]  text-white">
                <Modal
                    show={show}
                    setShow={setShow}
                    data={modalData}

                />
                {loading && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                        <div className="flex flex-col items-center gap-3">

                            {/* Spinner */}
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                            {/* Text */}
                            <p className="text-white text-sm">Loading data...</p>

                        </div>
                    </div>
                )}
                {/* LEFT SMALL CARDS */}
                <div className="col-span-3 grid grid-cols-2 gap-3">
                    {patchesCount.map((item, i) => {
                        const Icon = DashboardsCount[item.title]['icon'];

                        return (
                            <div
                                key={i}
                                onClick={() => handleClick('dashboardCount', item.key)}
                                className="bg-[#0b1220] rounded-lg p-3 border border-gray-800 flex justify-between items-center"
                            >
                                <div>
                                    <div className="text-lg font-semibold">{item.value}</div>
                                    <div className="text-xs text-gray-400">{item.title}</div>
                                </div>

                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-${DashboardsCount[item.title]['color']}-500/20 text-${DashboardsCount[item.title]['color']}-400`}
                                >
                                    <Icon size={18} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* MIDDLE CARD */}
                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4 border border-gray-800">

                    <div className="flex justify-between items-center mb-4">
                        <div>
                            {/* <div className="text-sm text-gray-400">Required Patch</div> */}
                            <h2 className="card-header"> Required Patch</h2>
                            <div className="text-2xl font-semibold">270 <span className="text-green-400 text-sm">↑</span></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            %
                        </div>
                    </div>

                    {requiredSeverityBar.map((item, i) => (
                        <div key={i} className="mb-5">

                            <div className="flex items-center gap-2 text-xs" >

                                {/* Label */}
                                <span className="text-gray-300 w-20">{item.label}</span>


                                <div className="flex-1 h-[10px] bg-gray-700 rounded">
                                    <div
                                        className={`h-full ${colorMap[SeverityCount[item.label]['color']]} rounded transition-all duration-500`}
                                        style={{ width: `${item.count}%` }}
                                    ></div>
                                </div>

                                {/* Value */}
                                <span className="w-10 text-right text-gray-300">{item.value}</span>

                            </div>

                        </div>
                    ))}

                </div>

                {/* RIGHT CHART CARD */}
                <div className="col-span-5 bg-[#0b1220] rounded-lg p-4">

                    <div className="flex items-center gap-2 mb-4">
                        {/* <div className="w-[3px] h-4 bg-blue-500"></div> */}
                        {/* <span className="text-sm text-gray-300">Date Wise Patching Status</span> */}
                        <h2 className="card-header"> Date Wise Patching Status </h2>
                    </div>

                    {/* Chart */}
                    <div className="h-[220px]" >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyPatchLine}>

                                {/* Gradients */}
                                <defs>
                                    <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                    </linearGradient>

                                    <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>

                                    <linearGradient id="pink" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e879f9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#e879f9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                {/* Grid */}
                                <CartesianGrid stroke="#1e293b" strokeDasharray="3 6" vertical={false} />

                                {/* Axis */}
                                <XAxis dataKey="name" stroke="#64748b" tickLine={false} tick={{ fontSize: 12 }} axisLine={false} />
                                <YAxis domain={['auto', 'auto']} stroke="#64748b" tickLine={false} tick={{ fontSize: 12 }} axisLine={false} />

                                {/* Tooltip */}
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#020617",
                                        border: "1px solid #1e293b",
                                        color: "#fff",
                                    }}
                                />

                                {/* Areas */}
                                <Area
                                    type="monotone"
                                    dataKey="pending"
                                    stroke="#7c3aed"
                                    fill="url(#purple)"
                                    strokeWidth={2.5}
                                    dot={{
                                        r: 4,
                                        onClick: (data) => {
                                            const req = {
                                                "yearmonth": data.payload.name
                                            }

                                            handleClickModalParameter('linechart', 'pending', req);
                                        },
                                        style: { cursor: "pointer" }
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#38bdf8"
                                    fill="url(#blue)"
                                    strokeWidth={2.5}
                                    dot={{
                                        r: 4,
                                        onClick: (data) => {
                                            const req = {
                                                "yearmonth": data.payload.name
                                            }

                                            handleClickModalParameter('linechart', 'completed', req);
                                        },
                                        style: { cursor: "pointer" }
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="failed"
                                    stroke="#e879f9"
                                    fill="url(#pink)"
                                    strokeWidth={2.5}
                                    dot={{
                                        r: 4,
                                        onClick: (data) => {
                                            const req = {
                                                "yearmonth": data.payload.name
                                            }

                                            handleClickModalParameter('linechart', 'failed', req);
                                        },
                                        style: { cursor: "pointer" }
                                    }}
                                />

                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-12 gap-3 p-2 bg-[#020617]  text-white">

                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4">

                    <div className="flex justify-between items-center mb-2">
                        <div>
                            {/* <div className="text-xs text-gray-400"> Application Patch Wise Status</div> */}
                            <h2 className="card-header"> Application Patch Wise Status </h2>
                            <div className="text-2xl font-semibold">
                                670 <span className="text-green-400 text-sm">↑</span>
                            </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            %
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[220px] mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={thirdPartyAppPatchStatus} barGap={2}>

                                <XAxis hide dataKey="name" />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#020617",
                                        border: "1px solid #1e293b",
                                    }}
                                />

                                {/* Bottom (dark purple) */}
                                <Bar
                                    dataKey="completed"
                                    stackId="a"
                                    fill="#6d28d9"
                                    radius={[2, 2, 0, 0]}
                                    cursor="pointer"
                                    onClick={(data, index) => {
                                        console.log("Clicked:", data);

                                        const req = {
                                            appName: data.name,
                                            status : 'completed'
                                        };

                                        handleClickModalParameter('barchart', 'appwise', req);
                                    }}
                                />

                                {/* Top (light gray) */}
                                <Bar
                                    dataKey="pending"
                                    stackId="a"
                                    fill="#475569"
                                    radius={[2, 2, 0, 0]}
                                    onClick={(data, index) => {
                                        console.log("Clicked:", data);

                                       const req = {
                                            appName: data.name,
                                            status : 'pending'
                                        };

                                        handleClickModalParameter('barchart', 'appwise', req);
                                    }}
                                />
                                <Bar
                                    dataKey="failed"
                                    stackId="a"
                                    fill="#c72014"
                                    radius={[2, 2, 0, 0]}
                                    onClick={(data, index) => {
                                        console.log("Clicked:", data);

                                        const req = {
                                            appName: data.name,
                                            status : 'failed'
                                        };


                                        handleClickModalParameter('barchart', 'appwise', req);
                                    }}
                                />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4">

                    <div className="flex justify-between items-center mb-3">
                        <div>
                            {/* <div className="text-xs text-gray-400">Machine Wise Status</div> */}
                            <h2 className="card-header"> Machine Wise Status </h2>
                            <div className="text-2xl font-semibold">
                                270 <span className="text-green-400 text-sm">↑</span>
                            </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            %
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-800"></div>

                    {/* Bars */}
                    <div className="h-[250px] w-[100%]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={thirdPartyIPPatchStatusChart} layout="vertical">

                                {/* X Axis */}
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} />

                                {/* Y Axis */}
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    width={120}
                                    fontSize={12}
                                />

                                {/* Tooltip */}
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                    contentStyle={{
                                        backgroundColor: "#020617",
                                        border: "1px solid #1e293b",
                                    }}
                                />

                                <Legend />

                                {/* ✅ Success */}
                                <Bar
                                    dataKey="completed"
                                    stackId="a"
                                    fill="#22c55e"
                                    name="Success"
                                    radius={[0, 4, 4, 0]}
                                    onClick={(data) => {
                                        handleClickModalParameter("hbarchart", "completed", {
                                            status: 'Success'
                                        });
                                    }}
                                />

                             
                                <Bar
                                    dataKey="pending"
                                    stackId="a"
                                    fill="#ef4444"
                                    name="Failed"
                                    onClick={(data) => {
                                        handleClickModalParameter("hbarchart", "Failed", {
                                            status: 'Failed'
                                        });
                                    }}
                                />

                                {/* ⚠️ Pending */}
                                <Bar
                                    dataKey="pending"
                                    stackId="a"
                                    fill="#facc15"
                                    name="Pending"
                                    onClick={(data) => {
                                        handleClickModalParameter("hbarchart", "Pending", {
                                            status: 'Pending'
                                        });
                                    }}
                                />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>


                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4">


                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-1">
                            {/* <div className="w-[3px] h-4 bg-blue-500"></div> */}
                            {/* <span className="text-sm text-gray-300">Top Risky Devices</span> */}
                            <h2 className="card-header"> Top Risky Devices </h2>
                        </div>

                        <span className="text-gray-500 cursor-pointer">•••</span>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg overflow-hidden border border-gray-800">

                        {/* Header Row */}
                        <div className="grid grid-cols-4 text-xs text-gray-400 bg-[#0f172a] px-3 py-2">
                            <span>Device</span>
                            <span>Missing Patches</span>
                            <span>Success Rate</span>
                            <span>Severity</span>
                        </div>

                        {/* Rows */}
                        {thirdPartyTopRiskyDevices.map((item, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-4 items-center px-3 py-2 text-xs border-t border-gray-800 hover:bg-[#0f172a]/50 transition"
                            >
                                <span className="text-gray-300">{item.ip}</span>

                                <span className="text-gray-300">{item.pending}</span>

                                <span className="text-gray-400">{item.successRate}</span>



                                <span>
                                    <span
                                        className={`px-2 py-[2px] rounded text-[10px] ${severityMap[item.severity]}`}
                                    >
                                        ● {item.severity}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>





                </div>

            </div>
            <div className="grid grid-cols-12 gap-3 p-2 bg-[#020617]  text-white">


                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4">


                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            {/* <div className="w-[3px] h-4 bg-blue-500"></div> */}
                            {/* <span className="text-sm text-gray-300">Machine-wise Patching Status</span> */}
                            <h2 className="card-header"> Machine-wise Patching Status </h2>
                        </div>

                        <span className="text-gray-500 cursor-pointer">•••</span>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg overflow-hidden border border-gray-800">

                        {/* Header Row */}
                        <div className="grid grid-cols-4 text-xs text-gray-400 bg-[#0f172a] px-3 py-2">
                            <span>Device</span>
                            <span>Missing Patches</span>
                            <span>Last Updated</span>
                            <span>Severity</span>
                        </div>

                        {/* Rows */}
                        {topRiskyDevice.map((item, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-4 items-center px-3 py-2 text-xs border-t border-gray-800 hover:bg-[#0f172a]/50 transition"
                            >
                                <span className="text-gray-300">{item.ip}</span>

                                <span className="text-gray-300">{item.patches}</span>

                                <span className="text-gray-400">{item.updated}</span>

                                <span>
                                    <span
                                        className={`px-2 py-[2px] rounded text-[10px] ${severityMap[item.severity]}`}
                                    >
                                        ● {item.severity}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>





                </div>


                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4">


                    <div className="flex justify-between mb-2">
                        <div>
                            {/* <div className="text-xs text-gray-400">Patch / Packet Progress</div> */}
                            <h2 className="card-header"> Patch / Packet Progress </h2>
                            <div className="text-2xl font-semibold">
                                670 <span className="text-green-400 text-sm">↑</span>
                            </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            %
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[160px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={PacketProgress}>

                                <defs>
                                    <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid stroke="#1e293b" strokeDasharray="3 6" vertical={false} />

                                <XAxis hide />
                                <YAxis hide />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    fill="url(#lineFill)"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: "#fff" }}
                                    activeDot={{ r: 5 }}
                                />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>








                </div>


                <div className="col-span-4 bg-[#0b1220] rounded-lg p-4">



                    {/* Header */}
                    {/* <div className="text-xs text-gray-400 mb-2">Job Per Host</div> */}

                    <h2 className="card-header">Job Per Host </h2>
                    <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                innerRadius="50%"
                                outerRadius="100%"
                                data={radialData}
                                startAngle={90}
                                endAngle={-270}
                                barSize={6}
                            >
                                <RadialBar
                                    dataKey="value"

                                    cornerRadius={4}
                                    background={{ fill: "#FFFFFF1A" }}
                                    style={{
                                        filter: "drop-shadow(0 0 2px currentColor)"
                                    }}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>

                        {/* Center Value */}
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                            30
                        </div>
                    </div>









                </div>


            </div>


        </div>
    )
}

export default ThirdPartyDashboard