import React from 'react'
import SinglePieCharts from '../../components/Charts/SinglePiecharts';

function PatchTree() {





  const branchDistribution = [
    {
      "name": "EIH",
      "value": 1
    },
    {
      "name": "UNMANAGED",
      "value": 2
    }
  ];


  const handleClickModalParameter = async (section, label, inputData) => {


  }


  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#000000] text-white  ">



      <div className="mb-1 bg-white dark:bg-[#0B1220] p-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-[#050B18] p-4 rounded-2xl">

          {/* Left Side Cards */}
          <div className="space-y-4">

            {/* Card 1 */}
            <div className="bg-[#0B1324] rounded-xl p-1 flex items-center justify-between shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 text-sm">%</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">93,930</h2>
                  <p className="text-gray-400 text-sm">Security Updates</p>

                  <p className="text-green-400 text-xs mt-2">
                    ↗ 120% Review & Updates
                  </p>
                </div>
              </div>

              <button className="text-cyan-400 text-xl hover:translate-x-1 transition">
                →
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0B1324] rounded-xl p-1 flex items-center justify-between shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-orange-400 text-sm">🖥</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">93,930</h2>
                  <p className="text-gray-400 text-sm">Critical Updates</p>

                  <p className="text-green-400 text-xs mt-2">
                    ↗ 120% Review & Updates
                  </p>
                </div>
              </div>

              <button className="text-cyan-400 text-xl hover:translate-x-1 transition">
                →
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0B1324] rounded-xl p-1 flex items-center justify-between shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 text-sm">👜</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">93,930</h2>
                  <p className="text-gray-400 text-sm">Products & Classification</p>

                  <p className="text-green-400 text-xs mt-2">
                    ↗ 120% Review & Updates
                  </p>
                </div>
              </div>

              <button className="text-cyan-400 text-xl hover:translate-x-1 transition">
                →
              </button>
            </div>
          </div>

          {/* Middle Doughnut Card */}
          <div className="bg-[#0B1324] rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-cyan-500 rounded-full"></div>
              <h3 className="text-white font-medium">Computer Status</h3>
            </div>

            <div className="flex items-center gap-6">

              {/* Pie Chart */}
              <SinglePieCharts
                data={branchDistribution}
                onSliceClick={handleClickModalParameter}
                datakey={"linuxBranchDistribution"}
              />

              {/* Legend */}
              <div className="flex flex-col gap-3">

                {branchDistribution?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    {/* Color Dot */}
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          item.color ||
                          ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"][
                          index % 5
                          ],
                      }}
                    />

                    {/* Label */}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>

                    {/* Value */}
                    <span className="text-sm font-semibold text-black dark:text-white">
                      ({item.value})
                    </span>
                  </div>
                ))}

              </div>
            </div>
            {/* Legend */}

          </div>

          {/* Right Doughnut Card */}
          <div className="bg-[#0B1324] rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-cyan-500 rounded-full"></div>
              <h3 className="text-white font-medium">Update Status</h3>
            </div>

            <div className="flex items-center gap-6">

              {/* Pie Chart */}
              <SinglePieCharts
                data={branchDistribution}
                onSliceClick={handleClickModalParameter}
                datakey={"linuxBranchDistribution"}
              />

              {/* Legend */}
              <div className="flex flex-col gap-3">

                {branchDistribution?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    {/* Color Dot */}
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          item.color ||
                          ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"][
                          index % 5
                          ],
                      }}
                    />

                    {/* Label */}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>

                    {/* Value */}
                    <span className="text-sm font-semibold text-black dark:text-white">
                      ({item.value})
                    </span>
                  </div>
                ))}

              </div>
            </div>


          </div>



        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-[#050B18] p-4 rounded-2xl">
          <div className="rounded-2xl bg-[#0B1220] border border-[#1E293B] p-5 shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#141E33] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582M20 20v-5h-.581M5.64 9A7 7 0 0119 8m-.64 7A7 7 0 015 16"
                    />
                  </svg>
                </div>

                <h2 className="text-sm font-medium text-white">
                  Synchronization status
                </h2>
              </div>

              {/* Refresh Button */}
              <button className="w-8 h-8 rounded-lg bg-[#141E33] flex items-center justify-center hover:bg-[#1C2740] transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h5M20 20v-5h-5"
                  />
                </svg>
              </button>
            </div>

            {/* Status Banner */}
            <div className="bg-[#062B18] border border-green-900 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

                <span className="text-green-400 text-sm font-semibold">
                  Idle
                </span>

                <span className="text-gray-400 text-xs">
                  — last sync succeeded
                </span>
              </div>

              <p className="text-[11px] text-gray-500 mt-2">
                Microsoft Update metadata • 12.4 MB received
              </p>
            </div>

            {/* Status Boxes */}
            <div className="grid grid-cols-2 gap-3 mb-5">

              {/* Status */}
              <div className="bg-[#111827] rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Status
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>

                  <span className="text-white text-sm font-semibold">
                    Idle
                  </span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-[#111827] rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Result
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>

                  <span className="text-green-400 text-sm font-semibold">
                    Succeeded
                  </span>
                </div>
              </div>
            </div>

            {/* Last Sync / Next Sync */}
            <div className="grid grid-cols-2 gap-3 mb-5">

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Last Sync
                </p>

                <div className="flex items-center gap-2 text-gray-300 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3"
                    />
                    <circle cx="12" cy="12" r="9" />
                  </svg>

                  Today, 04:22 AM
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Next Sync
                </p>

                <div className="flex items-center gap-2 text-gray-300 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3"
                    />
                    <circle cx="12" cy="12" r="9" />
                  </svg>

                  Today, 04:22 PM
                </div>
              </div>
            </div>

            {/* Footer Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">
                  catalog completeness
                </span>

                <span className="text-sm font-semibold text-green-400">
                  99.4%
                </span>
              </div>

              <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
                <div className="h-full w-[99.4%] bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className=" rounded-2xl bg-[#0B1220] p-5 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-2">

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#141E33] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-2a4 4 0 014-4h7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h18"
                    />
                  </svg>
                </div>

                <h2 className="text-sm font-medium text-white">
                  Server statistics
                </h2>
              </div>

              <span className="text-[10px] uppercase tracking-wider text-gray-500">
                Aggregate
              </span>
            </div>

            {/* Statistics */}
            <div className="space-y-5">

              {/* Row 1 */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    </div>

                    <span className="text-sm text-gray-300">
                      Unapproved updates
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-white">
                    105,132
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-yellow-400 rounded-full"></div>
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>

                    <span className="text-sm text-gray-300">
                      Approved updates
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-green-400">
                    13
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                  <div className="h-full w-[18%] bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    </div>

                    <span className="text-sm text-gray-300">
                      Declined / Superseded
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-300">
                    3,105
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-indigo-400 rounded-full"></div>
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    </div>

                    <span className="text-sm text-gray-300">
                      Total updates indexed
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-cyan-400">
                    108,250
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Footer Cards */}
            <div className="grid grid-cols-3 gap-3 mt-6">

              {/* Computers */}
              <div className="bg-[#111827] rounded-xl p-3 border border-[#1E293B]">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Computers
                </p>

                <h3 className="text-2xl font-bold text-white">
                  412
                </h3>
              </div>

              {/* Groups */}
              <div className="bg-[#111827] rounded-xl p-3 border border-[#1E293B]">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Groups
                </p>

                <h3 className="text-2xl font-bold text-white">
                  18
                </h3>
              </div>

              {/* Sync Errors */}
              <div className="bg-[#111827] rounded-xl p-3 border border-red-500/20">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  Sync Errors
                </p>

                <h3 className="text-2xl font-bold text-red-400">
                  —
                </h3>
              </div>

            </div>
          </div>


        </div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-[#050B18] p-4 rounded-2xl">

               <div className="space-y-4"> 

                
               </div>

         </div> */}
      </div>
      {/* Header */}

      <div className="mb-1 bg-gray-100 dark:bg-[#0B1220] p-4 ">



      </div>


    </div >
  )
}

export default PatchTree