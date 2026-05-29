import React, { useMemo,useState ,useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const NewFirmwareUpgrade = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const device = state?.device;

    // fallback safety
    if (!device) {
        return (
            <div className="p-6 text-white">
                No device selected
                <button onClick={() => navigate(-1)} className="ml-3 text-cyan-400">
                    Go Back
                </button>
            </div>
        );
    }

    const connectionDefaults = {
        protocol: "SCP",
        repoIp: "10.10.10.5",
        repoPath: "/firmware/cisco/",
    };

    const authDefaults = {
        username: "admin",
        password: "••••••••",
    };


    const [progress, setProgress] = useState(0);

    const steps = [
        {
            title: "Connectivity Validation",
            start: 0,
            end: 5,
            status: "Validating device reachability",
        },
        {
            title: "Firmware Validation",
            start: 5,
            end: 15,
            status: "Checking firmware compatibility",
        },
        {
            title: "Uploading Firmware",
            start: 15,
            end: 45,
            status: "Uploading firmware package",
        },
        {
            title: "Installing Firmware",
            start: 45,
            end: 70,
            status: "Installing firmware on device",
        },
        {
            title: "Rebooting Device",
            start: 70,
            end: 85,
            status: "Device reboot in progress",
        },
        {
            title: "Verifying Upgrade",
            start: 85,
            end: 98,
            status: "Running post-upgrade checks",
        },
        {
            title: "Upgrade Successful",
            start: 98,
            end: 100,
            status: "Upgrade completed successfully",
        },
    ];

    const logs = [
        { progress: 2, message: "12:48:21 Device reachable via SSH" },
        { progress: 5, message: "12:48:23 Connectivity validation completed" },

        { progress: 8, message: "12:48:25 Firmware checksum verification started" },
        { progress: 15, message: "12:48:27 Firmware validation successful" },

        { progress: 20, message: "12:48:30 Upload started - 412 MB package" },
        { progress: 28, message: "12:48:33 Upload 25% completed - 4.1 MB/s" },
        { progress: 35, message: "12:48:36 Upload 50% completed - 4.3 MB/s" },
        { progress: 45, message: "12:48:40 Upload completed successfully" },

        { progress: 52, message: "12:48:42 Installation started" },
        { progress: 60, message: "12:48:46 Extracting firmware image" },
        { progress: 70, message: "12:48:50 Firmware installation completed" },

        { progress: 75, message: "12:48:52 Device reboot initiated" },
        { progress: 85, message: "12:48:58 Device back online" },

        { progress: 90, message: "12:49:00 Running health verification checks" },
        { progress: 98, message: "12:49:03 Upgrade verification successful" },

        { progress: 100, message: "12:49:05 Firmware upgrade completed" },
    ];

    /* ================= AUTO PROGRESS ================= */

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }

                return prev + 1;
            });
        }, 1500);

        return () => clearInterval(timer);
    }, []);

    /* ================= ACTIVE STEP ================= */
     useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                navigate("/section/UpgradeResult", {
                    state: {
                        device,
                        duration: "6m 42s",
                        transferred: "412 MB",
                        throughput: "4.3 MB/s",
                        downtime: "48s",
                    },
                });
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [progress, navigate, device]);

    const activeStep = useMemo(() => {
        return steps.findIndex(
            (step) => progress >= step.start && progress < step.end
        );
    }, [progress]);

    const currentStep =
        steps[activeStep >= 0 ? activeStep : steps.length - 1];

    /* ================= DYNAMIC LOGS ================= */

    const visibleLogs = useMemo(() => {
        return logs.filter((log) => progress >= log.progress);
    }, [progress]);

    /* ================= ESTIMATED TIME ================= */

    const remainingSeconds = Math.max((100 - progress) * 1.5, 0);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);

    return (
        // min-h-screen
        <div className=" bg-[#0b1220] text-white p-4 space-y-4">

            {/* HEADER */}
           <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold">
                        Firmware Upgrade ·{" "}
                        {device?.device || device?.deviceData?.hostname}
                    </h1>

                    <p className="text-xs text-gray-400">
                        Guided workflow — context is preserved between steps.
                    </p>
                </div>
            </div>
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between mb-4">

                {["Device", "Validation", "Configuration", "Upgrade", "Result"].map((s, i, arr) => (
                    <div key={i} className="flex items-center flex-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold 
                                     ${i === 3 ? "bg-cyan-500 text-black" : i < 3 ? "bg-green-500 text-black" : "bg-gray-800 text-gray-300"}`} >
                                {i + 1}
                            </div>
                            <span className={`text-xs ${i === 3 ? "text-cyan-400" : "text-gray-400"}`}> {s} </span>
                        </div>
                        {i !== arr.length - 1 && (<div className="flex-1 h-px mx-3 bg-gray-700" />)}
                    </div>
                ))}
            </div>

           <div className="bg-[#0b1220] text-white p-4 space-y-4 min-h-screen">

            {/* ================= HEADER ================= */}
           

            {/* ================= TOP PROGRESS BAR ================= */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">

                <div className="flex items-center justify-between">

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4">

                        {/* CIRCLE */}
                        <div className="relative w-16 h-16">

                            <svg className="w-16 h-16 rotate-[-90deg]">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#374151"
                                    strokeWidth="6"
                                    fill="none"
                                />

                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#06b6d4"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray={176}
                                    strokeDashoffset={176 - (176 * progress) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-700"
                                />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                {progress}%
                            </div>
                        </div>

                        {/* TEXT */}
                        <div>
                            <p className="text-xs text-gray-400">
                                Current Stage
                            </p>

                            <p className="text-sm font-semibold text-cyan-400">
                                {currentStep?.title}
                            </p>

                            <p className="text-xs text-gray-500">
                                Estimated remaining - {minutes}m {seconds}s
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4 w-[60%]">

                        {/* PROGRESS BAR */}
                        <div className="flex-1">

                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Overall Progress</span>
                                <span>{progress}%</span>
                            </div>

                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-cyan-500 transition-all duration-700"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* STEP DOTS */}
                            <div className="flex justify-between mt-3 px-1">

                                {steps.map((step, i) => {
                                    const completed = progress >= step.end;
                                    const active =
                                        progress >= step.start &&
                                        progress < step.end;

                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center flex-1"
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full transition-all duration-500
                                                ${completed
                                                        ? "bg-green-500"
                                                        : active
                                                            ? "bg-cyan-400 scale-125"
                                                            : "bg-gray-600"
                                                    }`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* STEP LABELS */}
                            <div className="flex justify-between mt-3 text-[10px] text-gray-500 gap-2">

                                {steps.map((step, i) => {
                                    const active =
                                        progress >= step.start &&
                                        progress < step.end;

                                    return (
                                        <span
                                            key={i}
                                            className={`text-center flex-1 transition-all
                                            ${active
                                                    ? "text-cyan-400"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {step.title}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CANCEL BUTTON */}
                        <button className="shrink-0 px-3 py-2 text-xs bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg" onClick={() => navigate('/section/DeviceInventory')}>
                            Cancel Upgrade
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= MAIN GRID ================= */}
            <div className="grid grid-cols-12 gap-4">

                {/* ================= LEFT ================= */}
                <div className="col-span-3 bg-[#0f172a] border border-gray-800 rounded-xl p-4">

                    <h2 className="text-sm font-semibold mb-3">
                        Upgrade Steps
                    </h2>

                    <div className="space-y-3">

                        {steps.map((step, i) => {
                            const completed = progress >= step.end;

                            const active =
                                progress >= step.start &&
                                progress < step.end;

                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-500
                                        ${completed
                                                ? "bg-green-500 text-black"
                                                : active
                                                    ? "bg-cyan-500 text-black scale-110"
                                                    : "bg-gray-800 text-gray-400"
                                            }`}
                                    >
                                        {completed ? "✓" : i + 1}
                                    </div>

                                    <div>
                                        <p className="text-xs">
                                            {step.title}
                                        </p>

                                        <p className="text-[10px] text-gray-500">
                                            {completed
                                                ? "Completed"
                                                : active
                                                    ? "In Progress"
                                                    : "Pending"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="col-span-9 space-y-4">

                    {/* ROW 1 */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* DEVICE INFO */}
                        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">

                            <h2 className="text-sm font-semibold mb-3 text-slate-100">
                                Device Info
                            </h2>

                            <div className="grid grid-cols-2 gap-3 text-xs">

                                <div>
                                    <p className="text-gray-500">Hostname</p>
                                    <p>{device?.device}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Vendor</p>
                                    <p>{device?.vendor}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Current Version
                                    </p>

                                    <p className="text-orange-400">
                                        {device?.currentVersion}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Target Version
                                    </p>

                                    <p className="text-cyan-400">
                                        {device?.latestVersion}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Repository
                                    </p>

                                    <p>10.10.10.5</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Status</p>

                                    <p className="text-green-400">
                                        Healthy
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* UPGRADE STATUS */}
                        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">

                            <h2 className="text-sm font-semibold mb-3 text-slate-100">
                                Upgrade Status
                            </h2>

                            <div className="grid grid-cols-2 gap-3 text-xs">

                                <div>
                                    <p className="text-gray-500">
                                        Current Stage
                                    </p>

                                    <p className="text-cyan-400">
                                        {currentStep?.title}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Completion
                                    </p>

                                    <p className="text-green-400">
                                        {progress}%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Transfer Protocol
                                    </p>

                                    <p>SCP</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Throughput
                                    </p>

                                    <p className="text-green-400">
                                        {(3.8 + progress / 50).toFixed(1)} MB/s
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Status</p>

                                    <p className="text-green-400">
                                        {progress === 100
                                            ? "Completed"
                                            : "Running"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LOGS */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl">

                        <div className="p-4 border-b border-slate-800 flex items-center gap-2 font-semibold">
                            Deployment Activity Logs
                        </div>

                        <div className="p-4 font-mono text-sm bg-slate-950 text-green-400 h-72 overflow-auto space-y-2">

                            {visibleLogs.map((log, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse"
                                >
                                    {log.message}
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-800 rounded text-xs"
            >
              Back
            </button>
         
            <button onClick={() =>
              navigate("/section/UgradeFirmware", {
                state: { device },
              })
            } className="px-4 py-2 bg-cyan-600 rounded text-xs">
              Save Configuration
            </button>
          </div> */}

                </div>
            </div>
        </div>

        </div>
    );
};

export default NewFirmwareUpgrade;