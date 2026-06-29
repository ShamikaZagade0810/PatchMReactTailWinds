import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import {
    Search, RefreshCw, Download, CheckCircle2, ShieldAlert, AlertTriangle,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import {  getThirdPartyMissingApps, thirdPartyMissingApprovePatches } from "../../api/projectApi";
import { ToastContainer, toast } from 'react-toastify';
import { exportTable } from '../../components/utils/exportUtils';

const MissingApps = () => {
    // const thirdmissingapps = [
    //     { srNo: 1, ipAddress: "192.168.0.15", hostName: "Shamika-Zagade", application: "HeidiSQL", installedVersion: "12.7", latestVersion: "12.13", status: "DECLINED" },
    //     { srNo: 2, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Beats filebeat", installedVersion: "9.0.1", latestVersion: "9.2.2", status: "DECLINED" },
    //     { srNo: 3, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Git", installedVersion: "2.48.1", latestVersion: "2.52.0", status: "DECLINED" },
    //     { srNo: 4, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "HeidiSQL", installedVersion: "12.10", latestVersion: "12.13", status: "DECLINED" },
    //     { srNo: 5, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Microsoft Visual Studio Code", installedVersion: "1.103.2", latestVersion: "1.106.3", status: "DECLINED" },
    //     { srNo: 6, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Notepad++", installedVersion: "8.7.7", latestVersion: "8.8.8", status: "DECLINED" },
    //     { srNo: 7, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Oracle VM VirtualBox", installedVersion: "7.0.16", latestVersion: "7.2.4", status: "DECLINED" },
    //     { srNo: 8, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "WinRAR", installedVersion: "6.00.0", latestVersion: "7.13.0", status: "DECLINED" },
    //     { srNo: 9, ipAddress: "192.168.0.39", hostName: "Neeraj-Sharma", application: "Everything", installedVersion: "1.4.1.1026", latestVersion: "1.4.1.1030", status: "DECLINED" },
    //     { srNo: 10, ipAddress: "192.168.0.39", hostName: "Neeraj-Sharma", application: "HeidiSQL", installedVersion: "12.1", latestVersion: "12.13", status: "DECLINED" },
    //     { srNo: 11, ipAddress: "192.168.0.236", hostName: "DESKTOP-F7V9A7C", application: "Git", installedVersion: "2.49.0", latestVersion: "2.52.0", status: "DECLINED" },
    //     { srNo: 12, ipAddress: "192.168.0.236", hostName: "DESKTOP-F7V9A7C", application: "HeidiSQL", installedVersion: "12.2", latestVersion: "12.13", status: "DECLINED" },
    //     { srNo: 13, ipAddress: "192.168.0.236", hostName: "DESKTOP-F7V9A7C", application: "Notepad++", installedVersion: "8.8.1", latestVersion: "8.8.8", status: "DECLINED" },
    //     { srNo: 14, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "Google Chrome", installedVersion: "143.0.7499.193", latestVersion: "145.0.7632.76", status: "DECLINED" },
    //     { srNo: 15, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "Microsoft Edge", installedVersion: "143.0.3650.139", latestVersion: "145.0.3800.58", status: "DECLINED" },
    //     { srNo: 16, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "Microsoft OneDrive", installedVersion: "25.224.1116.0003", latestVersion: "26.012.0119.0002", status: "DECLINED" },
    //     { srNo: 17, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "Node.js", installedVersion: "20.18.0", latestVersion: "25.6.1", status: "DECLINED" },
    //     { srNo: 18, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "WinRAR", installedVersion: "7.13.0", latestVersion: "7.20.0", status: "DECLINED" },
    //     { srNo: 19, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "Windows PC Health Check", installedVersion: "3.6.2204.08001", latestVersion: "4.0.2410.23001", status: "DECLINED" },
    //     { srNo: 20, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "Windows Subsystem for Linux", installedVersion: "2.3.24.0", latestVersion: "2.6.3", status: "DECLINED" },
    //     { srNo: 21, ipAddress: "192.168.0.37", hostName: "Shridhar-Varadkar", application: "draw.io", installedVersion: "1.0", latestVersion: "29.3.6", status: "DECLINED" },
    //     { srNo: 22, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Google Chrome", installedVersion: "143.0.7499.41", latestVersion: "145.0.7632.76", status: "DECLINED" },
    //     { srNo: 23, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Microsoft Edge", installedVersion: "144.0.3719.82", latestVersion: "145.0.3800.58", status: "DECLINED" },
    //     { srNo: 24, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Microsoft OneDrive", installedVersion: "25.224.1116.0003", latestVersion: "26.012.0119.0002", status: "DECLINED" },
    //     { srNo: 25, ipAddress: "192.168.0.105", hostName: "Sumit-Shedge", application: "Node.js", installedVersion: "22.17.0", latestVersion: "25.6.1", status: "DECLINED" }
    // ];

    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [ThirdPartyMissingApp, setThirdPartyMissingApp] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        setLoading(true);
        const Repodata = await getThirdPartyMissingApps();
        console.log("Data --> ", Repodata.data.data);
        setThirdPartyMissingApp(Repodata.data.data);
        setLoading(false);

    }

    // Filter Data
    const filteredData = useMemo(() => {
        return ThirdPartyMissingApp.filter((item) =>
            item.app.toLowerCase().includes(search.toLowerCase()) ||
            item.host.toLowerCase().includes(search.toLowerCase()) ||
            item.ip.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, ThirdPartyMissingApp]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);


    // select all


    // Select All
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(paginatedData.map((item) => item.srNo));
        } else {
            setSelectedRows([]);
        }
    };

    // Single Row Select
    // const handleRowSelect = (srNo) => {
    //     setSelectedRows((prev) =>
    //         prev.includes(srNo)
    //             ? prev.filter((id) => id !== srNo)
    //             : [...prev, srNo]
    //     );
    // };

    // const handleRowSelect = (item) => {
    //     setSelectedRows((prev) => {
    //         const alreadyExists = prev.some( 
    //             (row) => row.srNo === item.srNo
    //         );

    //         return alreadyExists
    //             ? prev.filter((row) => row.srNo !== item.srNo)
    //             : [...prev, item];
    //     });
    // };
    const handleRowSelect = (item) => {
    setSelectedRows(prev =>
        prev.includes(item.srNo)
            ? prev.filter(id => id !== item.srNo)
            : [...prev, item.srNo]
    );
};

    const handleClickApprove = async () => {
        try {
            // const reqData = selectedRows.map(obj => ({
            //     ip: obj.ip,
            //     app: obj.app
            // }));
            const reqData = ThirdPartyMissingApp
    .filter(item => selectedRows.includes(item.srNo))
    .map(item => ({
        ip: item.ip,
        app: item.app
    }));
            console.log("Hii ", reqData);

            const resdata = await thirdPartyMissingApprovePatches(reqData);
            console.log("Approved response", resdata.data.message)
            if (resdata.data.status === 200) {
                toast.success("Successfully Approved")
                // Clear selected rows
                setSelectedRows([]);
                await getData();
            }
            else {
                toast.error("Something went Wrong !! ")
            }
        } catch (error) {
            console.error(error);
            toast.error("API Error");
        }
    }

       const handleRefresh = async () => {
        try {
            await getData();
        } catch (error) {
            console.error("Refresh failed:", error);
        }
    };

    const exportColumns = [
  { header: "IP Address", key: "hostName" },
  { header: "Application", key: "appName" },
  { header: "Installed Version", key: "currentVersion" },
  { header: "Latest Version", key: "availableVersion" },
  {
    header: "Status",
    render: (row) => row.status,
  },
];

    return (
        
        <div className="bg-[#050B18] rounded-xl p-4 border border-white/10 min-h-screen text-white text-sm">
<ToastContainer />
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

                <div>
                    <h1 className="text-xl font-bold"> Missing Applications </h1>
                    <p className="text-xs text-gray-400 mt-1"> Applications pending updates across endpoints. </p>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#111827] border border-[#1e293b] hover:border-cyan-500 transition-all duration-300">
                        <RefreshCw size={14} /> Refresh
                    </button>
{/* 
                    <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
                        <Download size={14} /> Export
                    </button> */}
                      <button onClick={() => {
                                            console.log("Export Data ", filteredData),
                                                exportTable({ type: "pdf", title: "Third Party Missing Report", fileName: "ThirdParty_Missing_Report", columns: exportColumns, data: filteredData, })
                                        }}
                                            className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
                                            <Download size={14} /> Export
                                        </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300" onClick={() => handleClickApprove()}>
                        <Download size={14} /> Approve
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-cyan-500 uppercase tracking-wide"> Total Missing Apps </p>
                            <h2 className="text-2xl font-bold mt-1"> {paginatedData.length} </h2>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <ShieldAlert size={18} className="text-cyan-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-red-500 uppercase tracking-wide"> Declined </p>
                            <h2 className="text-2xl font-bold mt-1">
                                {paginatedData.filter(item => item.status === "DECLINED").length}
                            </h2>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle size={18} className="text-red-400" />
                        </div>
                    </div>
                </div>
                <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-green-500 uppercase tracking-wide"> Selected Apps </p>
                            <h2 className="text-2xl font-bold mt-1">{selectedRows.length}</h2>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 size={18} className="text-emerald-400" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Search + Page Size */}
            <div className="bg-[#0B1220] rounded-xl p-3 border border-[#1e293b] mb-4">
                <div className="flex flex-col lg:flex-row gap-3 items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input type="text" placeholder="Search application / hostname / ip..." value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }} className="w-full bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs"
                        />
                    </div>

                    {/* Rows Per Page */}
                    <select value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg px-3 py-2.5 text-xs min-w-[120px]" >
                        <option value={10}>10 / page</option>
                        <option value={20}>20 / page</option>
                        <option value={30}>30 / page</option>
                    </select>

                    {/* Count */}
                    <div className="text-[11px] text-gray-400 whitespace-nowrap">
                        Showing {paginatedData.length} of {filteredData.length}
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#1e293b]">

                <table className="w-full min-w-[1100px] text-xs">
                    <thead className="bg-[#1e293b] border-b border-[#1e293b] ">
                        <tr className="text-left text-sm font-semibold text-gray-300">
                            {/* <th className="px-4 py-3 font-medium">Sr No</th> */}
                            <th className="px-4 py-3 font-medium">
                                <input type="checkbox" checked={paginatedData.length > 0 && paginatedData.every((item) => selectedRows.includes(item.srNo))}
                                    onChange={handleSelectAll} className="w-4 h-4 rounded border border-[#334155] bg-[#111827] accent-cyan-500 cursor-pointer" />
                            </th>
                            <th className="px-4 py-3 font-medium">IP Address</th>
                            <th className="px-4 py-3 font-medium">Host Name</th>
                            <th className="px-4 py-3 font-medium">Application</th>
                            <th className="px-4 py-3 font-medium">Installed Version</th>
                            <th className="px-4 py-3 font-medium">Latest Version</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <tr key={item.srNo} className="border-b border-[#1e293b] hover:bg-[#111827] transition-all duration-300" >

                                    <td className="px-4 py-3">
                                        <input type="checkbox"  checked={selectedRows.includes(item.srNo)} onChange={() => handleRowSelect(item)} />
                                    </td>
                                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap"> {item.ip} </td>
                                    <td className="px-4 py-3"> {item.host} </td>
                                    <td className="px-4 py-3 font-medium text-white"> {item.app} </td>
                                    <td className="px-4 py-3 text-gray-300"> {item.installedVersion} </td>
                                    <td className="px-4 py-3 text-cyan-400"> {item.latestVersion} </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] border bg-red-500/10 text-red-400 border-red-500/20">
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-400 text-xs" > No Data Available </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">

                <div className="text-xs text-gray-400"> Page {currentPage} of {totalPages} </div>

                <div className="flex items-center gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}
                        className="w-8 h-8 rounded-lg border border-[#1e293b] bg-[#111827] flex items-center justify-center disabled:opacity-40" >
                        <ChevronLeft size={15} />
                    </button>

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}
                        className="w-8 h-8 rounded-lg border border-[#1e293b] bg-[#111827] flex items-center justify-center disabled:opacity-40" >
                        <ChevronRight size={15} />
                    </button>

                </div>
            </div>
            
        </div>
    )
}

export default MissingApps
