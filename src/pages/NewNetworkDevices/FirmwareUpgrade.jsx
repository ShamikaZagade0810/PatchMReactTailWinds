import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, RefreshCw } from "lucide-react";

const FirmwareUpgrade = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log("State ", state);
    const device = state?.device;

    const validation = [
        {
            title: "Device Reachable",
            sub: "ICMP + management interface",
            status: "validating",
        },
        {
            title: "SSH Accessible",
            sub: "Port 22 / key auth",
            status: "pass",
        },
        {
            title: "File Transfer Service",
            sub: "SCP/SFTP enabled on target",
            status: "disabled",
        },
        {
            title: "Firmware Compatible",
            sub: "17.6.4 → 17.12.3",
            status: "pass",
        },
        {
            title: "Sufficient Disk Space",
            sub: "≥ 2.4 GB free required",
            status: "pass",
        },
        {
            title: "Privileged Access",
            sub: "Enable / sudo elevation",
            status: "pass",
        },
        {
            title: "Network Stability",
            sub: "<1% loss over 60s",
            status: "warning",
        },
    ];

    const statusUI = (status) => {
        if (status === "pass")
            return <span className="text-green-400 text-xs">Pass</span>;

        if (status === "warning")
            return <span className="text-yellow-400 text-xs">Warning</span>;

        if (status === "disabled")
            return <span className="text-red-400 text-xs">Disabled</span>;

        return (
            <span className="text-cyan-400 text-xs flex items-center gap-1">
                <RefreshCw size={12} className="animate-spin" /> Validating...
            </span>
        );
    };

    return (
        <div className=" bg-[#0b1220] text-white p-4">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h1 className="text-lg font-semibold">
                        Upgrade Readiness · {device?.device || "MUM-EDGE-RTR-01"}
                    </h1>
                    <p className="text-xs text-gray-400">
                        Guided workflow — context is preserved between steps.
                    </p>
                </div>
            </div>

            {/* STEPPER */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between mb-4">

                {["Device", "Validation", "Configuration", "Upgrade", "Result"].map((s, i, arr) => (
                    <div key={i} className="flex items-center flex-1">

                        <div className="flex items-center gap-2">
                            <div
                                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold 
                                     ${i === 1 ? "bg-cyan-500 text-black" : i < 1 ? "bg-green-500 text-black" : "bg-gray-800 text-gray-300"}`} >
                                {i + 1}
                            </div>

                            <span className={`text-xs ${i === 1 ? "text-cyan-400" : "text-gray-400"}`}>
                                {s}
                            </span>
                        </div>

                        {i !== arr.length - 1 && (
                            <div className="flex-1 h-px mx-3 bg-gray-700" />
                        )}

                    </div>
                ))}
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-3 gap-4">

                {/* LEFT DEVICE CARD */}
                <div className="space-y-4">

                    {/* CARD 1 - DEVICE INFO */}
                    <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">

                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold text-sm">{device.device}</h2>
                                <p className="text-xs text-gray-400">{device.vendor}</p>
                            </div>

                            <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-1 rounded">
                                Outdated
                            </span>
                        </div>

                        {/* GRID INFO */}
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                            {[
                                ["IP Address", device.ipAddress],
                                ["OS", device.os],
                                ["Current", device.currentVersion],
                                ["Target", device.latestVersion],
                                ["Vulnerabilities", device.vulnerabilityCount],
                                ["Last Scan", "2m ago"],
                            ].map(([k, v], i) => (
                                <div
                                    key={i}
                                    className="bg-[#111827] border border-gray-800 rounded-lg p-2"
                                >
                                    <div className="text-gray-500">{k}</div>
                                    <div className="text-gray-200 font-medium">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* CARD 2 - READINESS SCORE */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-xs text-gray-400 mb-1"> Readiness Score </div>

                        {/* ROW 1 */}
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold">57%</div>
                            <div className="text-xs text-gray-300"> 4/7 checks passed </div>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500" style={{ width: "57%" }} />
                        </div>

                        {/* STATUS BREAKDOWN */}
                        <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                            <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                                <div className="text-green-400 font-semibold">Passed</div>
                                <div>4</div>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2">
                                <div className="text-yellow-400 font-semibold">Warnings</div>
                                <div>2</div>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                                <div className="text-red-400 font-semibold">Failed</div>
                                <div>1</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-span-2 bg-[#0f172a] border border-gray-800 rounded-xl p-4 relative">

                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold"> Pre-flight Validation </h2>

                        <button className="flex items-center gap-2 text-xs text-gray-300"> <RefreshCw size={14} /> Revalidate </button>
                    </div>

                    <div className="border-t border-gray-800 mb-3" />

                    {/* CHECKS */}
                    <div className="space-y-0 bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">
                        {validation.map((v, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <div>
                                        <div className="text-sm">{v.title}</div>
                                        <div className="text-xs text-gray-400">{v.sub}</div>
                                    </div>
                                    <div>{statusUI(v.status)}</div>
                                </div>
                                {i !== validation.length - 1 && (
                                    <div className="h-px bg-gray-800 mx-4" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* WARNING BAR */}
                    <div className="mt-4 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs p-2 rounded">
                        ⚠ Configuration required before firmware upgrade.
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="flex justify-between mt-4">
                        <button className="text-xs px-4 py-2 bg-gray-800 rounded"> Back </button>

                        <button onClick={() => navigate("/section/NewConfigForm", { state: { device, }, })} className="text-xs px-4 py-2 bg-cyan-600 rounded">
                            Set Configuration →
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FirmwareUpgrade;