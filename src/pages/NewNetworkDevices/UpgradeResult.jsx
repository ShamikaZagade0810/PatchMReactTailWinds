import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  ChevronRight,
  Activity,
  ClipboardList,
} from "lucide-react";

const UpgradeResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const device = state?.device;

  return (
    <div className="min-h-screen bg-[#071120] text-white p-4">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-4">
        <p className="text-[11px] text-gray-500">
          Patch Management &gt; Network Devices
        </p>

        <h1 className="text-1xl font-semibold mt-1">
          Upgrade Complete · {device?.device || "MUM-EDGE-RTR-01"}
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Guided workflow — context is preserved between steps.
        </p>
      </div>

      {/* ================= STEPPER ================= */}
      <div className="bg-[#0d1728] border border-[#1c2a3d] rounded-2xl px-5 py-4 flex items-center justify-between mb-5">

        {["Device", "Validation", "Configuration", "Upgrade", "Result"].map(
          (step, i, arr) => (
            <div key={i} className="flex items-center flex-1">

              <div className="flex items-center gap-2">

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                  ${
                    i <= 4
                      ? i === 4
                        ? "bg-cyan-500 text-black"
                        : "bg-green-500 text-black"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>

                <span
                  className={`text-xs ${
                    i === 4 ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {step}
                </span>
              </div>

              {i !== arr.length - 1 && (
                <div className="flex-1 h-px bg-gray-700 mx-3" />
              )}
            </div>
          )
        )}
      </div>

      {/* ================= SUCCESS BANNER ================= */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#0d1f34] to-[#0c2430] p-5 flex justify-between items-center mb-5">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="text-green-400" size={28} />
          </div>

          <div>
            <p className="text-[10px] tracking-[2px] uppercase text-green-400 font-semibold">
              Upgrade Successful
            </p>

            <h2 className="text-1xl font-bold mt-1">
              {device?.device || "MUM-EDGE-RTR-01"} is now on{" "}
              <span className="text-cyan-400">
                {device?.latestVersion || "17.12.3"}
              </span>
            </h2>

            <p className="text-xs text-gray-400 mt-2">
              All post-upgrade health checks passed. Device returned to
              production.
            </p>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex gap-3">

          <button className="px-4 py-2 rounded-xl border border-gray-700 bg-[#0f172a] hover:bg-[#132038] text-sm flex items-center gap-2 transition">
            <Download size={15} />
            Download Report
          </button>

          <button
            onClick={() => navigate("/section1/DeviceInventory")}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium text-sm transition"
          >
            Back to Inventory
          </button>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-12 gap-4">

        {/* ================= RUN SUMMARY ================= */}
        <div className="col-span-8 bg-[#0d1728] border border-[#1b2a3d] rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-5">
            <Activity size={18} className="text-cyan-400" />
            <h2 className="text-sm font-semibold">Run Summary</h2>
          </div>

          <div className="grid grid-cols-4 gap-6">

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                Duration
              </p>
              <p className="text-1xl font-semibold">6 min 42s</p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                Downtime
              </p>
              <p className="text-1xl font-semibold">48 s</p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                Transferred
              </p>
              <p className="text-1xl font-semibold">412 MB</p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                Avg Throughput
              </p>
              <p className="text-1xl font-semibold text-cyan-400">
                4.3 MB/s
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                From
              </p>
              <p className="text-lg font-semibold text-orange-400">
                {device?.currentVersion || "17.6.4"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                To
              </p>
              <p className="text-lg font-semibold text-cyan-400">
                {device?.latestVersion || "17.12.3"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                CVEs Resolved
              </p>
              <p className="text-lg font-semibold text-green-400">3</p>
            </div>

            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-2">
                Rollback Required
              </p>
              <p className="text-lg font-semibold text-green-400">No</p>
            </div>
          </div>
        </div>

        {/* ================= RECOMMENDATIONS ================= */}
        <div className="col-span-4 bg-[#0d1728] border border-[#1b2a3d] rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-5">
            <ClipboardList size={18} className="text-cyan-400" />
            <h2 className="text-sm font-semibold">
              Next Recommended Actions
            </h2>
          </div>

          <div className="space-y-4 text-sm">

            {[
              "Verify routing convergence on neighbor peers",
              "Re-run vulnerability scan on the device",
              "Snapshot configuration backup",
              "Notify NOC channel of completion",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-gray-300"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full rounded-xl border border-gray-700 bg-[#101b2d] hover:bg-[#16243a] py-3 text-sm flex items-center justify-center gap-2 transition">
            <ChevronRight size={15} />
            View Full Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeResult;