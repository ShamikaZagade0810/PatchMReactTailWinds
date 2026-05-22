import React, { useMemo, useState } from 'react'
import {
    Monitor, Search, ChevronRight, AlertTriangle, CheckCircle2, Boxes, Clock3, ChevronLeft, Package, X, Download
} from "lucide-react";

const PatchRepositoryNew = () => {
    const patchRepositoryList = [
        { id: 1, appName: "Universal Android Debloater GUI", downloadUrl: "https://github.com/0x192/universal-android-debloater/releases/download/0.5.1/uad_gui-windows.exe", latestVersion: "0.5.1", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:11:25.000000" },
        { id: 2, appName: "0xGingi-Browser", downloadUrl: "https://github.com/0xGingi/0xgingi-browser/releases/download/115.0.5790.110/0xgingi-browser_115.0.5790.110-1.1_installer.exe", latestVersion: "115.0.5790.110", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:11:25.000000" },
        { id: 3, appName: "115???", downloadUrl: "https://down.115.com/client/win/115br_v36.0.0_x64.exe", latestVersion: "36.0.0", silentCommand: '"{file}" /S', updatedAt: "2026-01-15 05:30:18.000000" },
        { id: 4, appName: "123??", downloadUrl: "https://app.123957.com/pc-pro/windows/262/123pan_2.6.2.exe", latestVersion: "2.6.2.0", silentCommand: '"{file}" /S', updatedAt: "2026-01-15 05:30:18.000000" },
        { id: 5, appName: "JboxTransfer", downloadUrl: "https://github.com/1357310795/JboxTransfer/releases/download/v2.0.4/JboxTransfer.Webview2.Installer-win-any-no-runtime.exe", latestVersion: "2.0.4", silentCommand: '"{file}" /ALLUSERS /VERYSILENT /NORESTART /SP-', updatedAt: "2026-02-20 10:11:28.000000" },
        { id: 6, appName: "BPMN-RPA Studio", downloadUrl: "https://1ic.nl/BPMN_RPA/BPMN-RPA%20Studio.msi", latestVersion: "28.0.0", silentCommand: "", updatedAt: "2026-02-20 10:11:29.000000" },
        { id: 7, appName: "Fishing Funds", downloadUrl: "https://github.com/1zilc/fishing-funds/releases/download/v8.5.0/Fishing-Funds-Setup-8.5.0.exe", latestVersion: "8.5.0", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:31.000000" },
        { id: 8, appName: "SyncBackPro", downloadUrl: "https://www.2brightsparks.com/assets/software/SyncBack/SyncBackPro64_Setup.11.3.134.0.exe", latestVersion: "11.3.134.0", silentCommand: '"{file}" /verysilent', updatedAt: "2026-02-20 10:11:33.000000" },
        { id: 9, appName: "SyncBackSE", downloadUrl: "https://www.2brightsparks.com/assets/software/SyncBack/SyncBackSE64_Setup.11.3.134.0.exe", latestVersion: "11.3.134.0", silentCommand: '"{file}" /verysilent', updatedAt: "2026-02-20 10:11:34.000000" },
        { id: 10, appName: "360??", downloadUrl: "https://sfdl.360safe.com/pic360/pic360Setup.exe", latestVersion: "1.0.1.1260", silentCommand: '"{file}" --silent', updatedAt: "2026-01-15 05:30:19.000000" },
        { id: 11, appName: "????", downloadUrl: "https://sfile.chatglm.cn/apk/xinyu/windows/chatglm_setup_win32_1.1.8_default_full.exe", latestVersion: "1.1.8", silentCommand: '"{file}" /S', updatedAt: "2026-01-15 06:44:11.000000" },
        { id: 12, appName: "360???", downloadUrl: "https://down.360safe.com/pcnewapp/360FileSetup.exe", latestVersion: "1.0.0.1180", silentCommand: '"{file}" /S', updatedAt: "2026-01-15 05:30:20.000000" },
        { id: 13, appName: "360?????", downloadUrl: "https://down.360safe.com/se/360se16.1.2000.64.exe", latestVersion: "16.1.2000.64", silentCommand: '"{file}" --silent-install', updatedAt: "2026-01-15 05:30:28.000000" },
        { id: 14, appName: "", downloadUrl: "https://down.360safe.com/se/360namiai1.3.1535.64.exe", latestVersion: "1.3.1535.64", silentCommand: '"{file}" --silent-install', updatedAt: "2026-01-19 07:52:51.000000" },
        { id: 15, appName: "3CX Call Flow Designer", downloadUrl: "https://downloads-global.3cx.com/downloads/3CXCallFlowDesigner20.exe", latestVersion: "20.2.84", silentCommand: '"{file}" /qb', updatedAt: "2026-02-20 10:11:49.000000" },
        { id: 16, appName: "3CX Phone System", downloadUrl: "https://downloads-global.3cx.com/downloads/3CXPhoneSystem20.exe", latestVersion: "20.0.7.1080", silentCommand: '"{file}" /exenoui /quiet /norestart', updatedAt: "2026-02-20 10:11:49.000000" },
        { id: 17, appName: "3d-io Exr-IO", downloadUrl: "https://www.exr-io.com/wp-content/uploads/Exr-IO_2.06.00.exe", latestVersion: "2.06.00", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:50.000000" },
        { id: 18, appName: "3DVista Virtual Tour", downloadUrl: "https://download.3dvista.com/current/show/3DVVirtualTour_x64.exe", latestVersion: "2025.2.10", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:51.000000" },
        { id: 19, appName: "beqdesigner", downloadUrl: "https://github.com/3ll3d00d/beqdesigner/releases/download/1.1.10/beqdesigner_2022Server.exe", latestVersion: "1.1.10", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:11:51.000000" },
        { id: 20, appName: "Robo 3T", downloadUrl: "https://github.com/Studio3T/robomongo/releases/download/v1.4.4/robo3t-1.4.4-windows-x86_64-e6ac9ec5.exe", latestVersion: "1.4.4", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:52.000000" },
        { id: 21, appName: "iptvnator", downloadUrl: "https://github.com/4gray/iptvnator/releases/download/v0.18.0/iptvnator-0.18.0-windows-x64-setup.exe", latestVersion: "0.18.0", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:54.000000" },
        { id: 22, appName: "MessyFileOrganizer", downloadUrl: "https://github.com/4ngel2769/messy-file-organizer/releases/download/v1.0.0/MessyFileOrganizer-setup-x64.exe", latestVersion: "1.0.0", silentCommand: '"{file}" /ALLUSERS /VERYSILENT /NORESTART /SP-', updatedAt: "2026-02-20 10:11:54.000000" },
        { id: 23, appName: "5EClient", downloadUrl: "https://oss-arena.5eplay.com/client/5EClient-8.2.6.exe", latestVersion: "8.2.6", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:54.000000" },
        { id: 24, appName: "WinGoDarkTray", downloadUrl: "https://github.com/5mdt/WinGoDarkTray/releases/download/v2.0.0/WinGoDarkTray-x64.exe", latestVersion: "v2.0.0", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:11:54.000000" },
        { id: 25, appName: "Seanime Desktop", downloadUrl: "https://github.com/5rahim/seanime/releases/download/v3.4.3/seanime-denshi-3.4.3_Windows_x64.exe", latestVersion: "3.4.3", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:56.000000" },
        { id: 26, appName: "64Gram Desktop", downloadUrl: "https://github.com/TDesktop-x64/tdesktop/releases/download/v1.1.94/64Gram-setup-x64.1.1.94.exe", latestVersion: "1.1.94", silentCommand: '"{file}" /ALLUSERS /VERYSILENT /NORESTART /SP-', updatedAt: "2026-02-20 10:11:59.000000" },
        { id: 27, appName: "ndm", downloadUrl: "https://github.com/720kb/ndm/releases/download/v1.2.0/ndm-1.2.0.exe", latestVersion: "1.2.0", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:11:59.000000" },
        { id: 28, appName: "Aya", downloadUrl: "https://github.com/liriliri/aya/releases/download/v1.13.0/AYA-1.13.0-win-x64.exe", latestVersion: "1.13.0", silentCommand: '"{file}" /S', updatedAt: "2026-02-20 10:45:54.000000" },
        { id: 29, appName: "7-Zip", downloadUrl: "https://7-zip.org/a/7z2600-x64.exe", latestVersion: "26.00", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:00.000000" },
        { id: 30, appName: "8x8 Work", downloadUrl: "https://work-desktop-assets.8x8.com/prod-publish/ga/work-64-msi-v8.30.2-10.msi", latestVersion: "8.30.2", silentCommand: "", updatedAt: "2026-02-20 10:12:03.000000" },
        { id: 31, appName: "copyparty", downloadUrl: "https://github.com/9001/copyparty/releases/download/v1.20.7/copyparty.exe", latestVersion: "1.20.7", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:03.000000" },
        { id: 32, appName: "aws-vault", downloadUrl: "https://github.com/99designs/aws-vault/releases/download/v7.2.0/aws-vault-windows-arm64.exe", latestVersion: "7.2.0", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:03.000000" },
        { id: 33, appName: "Swiss CLI Tools", downloadUrl: "https://github.com/aakasheoran/swiss/releases/download/v1.0.0/swiss.exe", latestVersion: "1.0.0", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:05.000000" },
        { id: 34, appName: "e-Design", downloadUrl: "https://library.e.abb.com/public/f3eec04d29064fff87c51dea814e7d3b/9AKK106103A3346_enit_BX_e-Design.exe", latestVersion: "1.15.0.0007", silentCommand: '"{file}" /S /V/quiet /V/norestart', updatedAt: "2026-02-20 10:12:06.000000" },
        { id: 35, appName: "????????????", downloadUrl: "https://perbank.cdn-static.abchina.com/POBNew/ext/PowerExtensionABC.exe", latestVersion: "1.0", silentCommand: '"{file}" /S', updatedAt: "2026-01-15 05:30:47.000000" },
        { id: 36, appName: "Azkar", downloadUrl: "https://github.com/AbdelrahmanBayoumi/Azkar-App/releases/download/1.2.7/Azkar_windows-x64.exe", latestVersion: "1.2.7", silentCommand: '"{file}" -q', updatedAt: "2026-02-20 10:12:07.000000" },
        { id: 37, appName: "NeoHtop", downloadUrl: "https://github.com/Abdenasser/neohtop/releases/download/v1.2.0/NeoHtop_1.2.0_x64.exe", latestVersion: "1.2.0", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:07.000000" },
        { id: 38, appName: "Abelfubu.WindowsConfigBuilder", downloadUrl: "https://github.com/abelfubu/windows-config-builder/releases/download/v0.0.2/windows-config-builder.exe", latestVersion: "v0.0.2", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:07.000000" },
        { id: 39, appName: "InputTip", downloadUrl: "https://github.com/abgox/InputTip/releases/download/v2026.01.01/InputTip.exe", latestVersion: "2026.01.01", silentCommand: '"{file}" /S /quiet /norestart', updatedAt: "2026-02-20 10:12:10.000000" },
        { id: 40, appName: "Ablaze Floorp", downloadUrl: "https://github.com/Floorp-Projects/Floorp/releases/download/v12.10.3/floorp-windows-x86_64.installer.exe", latestVersion: "12.10.3@147.0.3", silentCommand: '"{file}" /S /PreventRebootRequired=true', updatedAt: "2026-02-20 10:12:12.000000" }
    ];


    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedApp, setSelectedApp] = useState(null);

    // ✅ Filter
    const filteredData = useMemo(() => {
        return patchRepositoryList.filter((item) =>
            `${item.appName} ${item.hostName} ${item.ipAddress}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    // ✅ Pagination logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);


    const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
};

    return (
        //   <div className="p-6 bg-[#050B18] min-h-screen text-white">
        <div className="p-6 text-white">

            {/* HEADER */}
            <div className="bg-[#0B1220] border border-[#1e293b] rounded-xl p-4 mb-4">
                <h1 className="text-lg font-semibold">📦 Package Catalog</h1>
                <p className="text-xs text-gray-400">
                    Manage application repository
                </p>
            </div>

            {/* SEARCH */}
            <div className="bg-[#0B1220] border border-[#1e293b] rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-3 items-center">

                <div className="relative flex-1 w-full">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search applications..."
                        className="w-full bg-[#111827] border border-[#1e293b] rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-cyan-500 transition" />
                </div>

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="bg-[#111827] border border-[#1e293b] rounded-lg px-3 py-2 text-xs"
                >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                </select>
                <div className="text-xs text-gray-400 whitespace-nowrap">
  Showing {paginatedData.length} out of {filteredData.length}
</div>

            </div>

            {/* MAIN LAYOUT */}
            <div className="flex gap-4">

                {/* TABLE CARD */}
                <div className="flex-[2]  bg-[#0B1220] border border-[#1e293b] rounded-xl overflow-hidden">

                    <div className="p-4 bg-[#050B18] ">

                        {/* TABLE CARD ONLY */}
                        <div className="bg-[#050B18] border border-[#1e293b] rounded-xl overflow-hidden">

                            <table className="w-full text-xs">
                                <thead className="bg-[#1e293b] text-gray-300">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Application</th>
                                        <th className="px-4 py-3 text-left">Latest</th>
                                        <th className="px-4 py-3 text-left">Updated</th>
                                         <th className="px-4 py-3 text-center">Export</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedData.map((item) => {
                                        const isSelected = selectedApp?.id === item.id;

                                        return (
                                            <tr
                                                key={item.id}
                                                onClick={() => setSelectedApp(item)}
                                                className={` border-b border-[#1e293b] cursor-pointer transition
                                                ${isSelected ? "bg-cyan-500/20 text-cyan-400" : " text-white-400 hover:bg-[#111827]"} `} >
                                                <td className="px-4 py-3  font-medium">
                                                    {item.appName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {item.latestVersion}
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {item.updatedAt}
                                                </td>
                                                <td className="px-4 py-3 text-center">
  <button
    onClick={(e) => {
      e.stopPropagation();
      console.log("Download:", item.appName);
    }}
    className="w-8 h-8 rounded-lg bg-cyan-500/8 border border-cyan-500/15
hover:bg-cyan-500/15 hover:border-cyan-400/30
flex items-center justify-center transition duration-200 mx-auto"
  >
    <Download size={14} className="text-cyan-400" />
  </button>
</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* PAGINATION */}
                            <div className="flex justify-between items-center p-3 border-t border-[#1e293b]">
                                <span className="text-xs text-gray-400">
                                    Page {currentPage} of {totalPages || 1}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                        className="w-8 h-8 border border-[#1e293b] rounded disabled:opacity-40 text-gray-300"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                        className="w-8 h-8 border border-[#1e293b] rounded disabled:opacity-40 text-gray-300"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* SIDE CARD */}
              {selectedApp && (
  <div className="w-[420px] bg-[#0B1220] border border-[#1e293b] rounded-xl p-4 relative">
    
    {/* CLOSE BUTTON */}
    <button
      onClick={() => setSelectedApp(null)}
      className="absolute top-3 right-3 p-1 rounded-md hover:bg-[#111827] text-gray-400 hover:text-white transition"
    >
      <X size={16} />
    </button>

    {/* ROW 1: Logo + App Name */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
        <Package size={18} className="text-cyan-400" />
      </div>

      <h2 className="text-sm font-semibold text-cyan-400">
        {selectedApp.appName}
      </h2>
    </div>

    {/* ROW 2: Cards */}
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-3">
        <p className="text-[10px] text-gray-400">Latest Version</p>
        <p className="text-xs text-cyan-400 font-medium">
          {selectedApp.latestVersion}
        </p>
      </div>

      <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-3">
        <p className="text-[10px] text-gray-400">Updated At</p>
        <p className="text-xs text-gray-300 font-medium">
          {formatDateTime(selectedApp.updatedAt)}
        </p>
      </div>
    </div>

    {/* ROW 3: Silent Command */}
    <div className="bg-[#050B18] border border-[#1e293b] rounded-lg p-3">
      <p className="text-[11px] text-gray-500 mb-1">Silent Command</p>
      <code className="text-[12px] text-gray-300 break-all">
        {selectedApp.silentCommand || "N/A"}
      </code>
    </div>

    <button
className="mt-4 w-full bg-cyan-600/60 border border-cyan-600/60
hover:bg-cyan-500/30 hover:border-cyan-500/30
transition duration-200 text-cyan-300 text-xs py-2.5 rounded-lg
flex items-center justify-center gap-2"
>
  <Download size={14} />
  Download Package
</button>
  </div>
)}

            </div>
        </div>
    )
}

export default PatchRepositoryNew
