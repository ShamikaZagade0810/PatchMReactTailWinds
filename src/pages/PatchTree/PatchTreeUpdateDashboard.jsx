import React from 'react';

import {
  Package,
  ShieldAlert,
  Monitor,
  BadgeCheck,
  Download,
  Search,
} from 'lucide-react';

export default function PatchTreeUpdateDashboard() {
  const summaryCards = [
    {
      title: 'Total Updates',
      value: '2,486',
      change: '+12%',
      icon: 'Package',
    },
    {
      title: 'Critical Updates',
      value: '86',
      change: '+5%',
      icon: 'ShieldAlert',
    },
    {
      title: 'Pending Systems',
      value: '124',
      change: '-8%',
      icon: 'Monitor',
    },
    {
      title: 'Compliance Rate',
      value: '92%',
      change: '+3%',
      icon: 'BadgeCheck',
    },
  ];

  const distroData = [
    {
      name: 'Ubuntu / Debian',
      critical: 26,
      security: 48,
      other: 206,
      compliant: 78,
    },
    {
      name: 'RHEL / CentOS',
      critical: 3,
      security: 25,
      other: 83,
      compliant: 146,
    },
  ];

  const updateCategories = [
    {
      title: 'All Updates',
      total: 320,
      progress: '82%',
      color: 'bg-cyan-500',
    },
    {
      title: 'Critical Updates',
      total: 86,
      progress: '61%',
      color: 'bg-red-500',
    },
    {
      title: 'Security Updates',
      total: 142,
      progress: '74%',
      color: 'bg-yellow-500',
    },
    {
      title: 'Feature Updates',
      total: 91,
      progress: '45%',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Linux Patch & Update Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Real-time visibility into patch compliance and update distribution
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all">
            <div className="flex items-center gap-2"><Download size={16} /> Export</div>
          </button>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20">
            <div className="flex items-center gap-2"><Search size={16} /> Discover</div>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">
                {card.icon === 'Package' && <Package size={18} />}
                {card.icon === 'ShieldAlert' && <ShieldAlert size={18} />}
                {card.icon === 'Monitor' && <Monitor size={18} />}
                {card.icon === 'BadgeCheck' && <BadgeCheck size={18} />}
              </div>
              <span className="text-green-400 text-sm font-medium">
                {card.change}
              </span>
            </div>

            <h3 className="text-slate-400 text-xs mb-1">{card.title}</h3>
            <div className="text-xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        {/* Compliance Trend Chart */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold">Patch Compliance Trend</h2>
              <p className="text-slate-400 text-sm mt-1">
                Last 7 days compliance overview
              </p>
            </div>

            <select className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          <div className="h-52 flex items-end gap-4">
            {[55, 62, 70, 68, 78, 84, 92].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-slate-800 rounded-t-2xl relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-2xl transition-all duration-500"
                    style={{ height: `${height * 2}px` }}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  Day {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="mb-6">
            <h2 className="text-base font-semibold">Severity Distribution</h2>
            <p className="text-slate-400 text-sm mt-1">
              Update severity classification
            </p>
          </div>

          <div className="flex justify-center items-center mb-5">
            <div className="relative w-40 h-40 rounded-full bg-[conic-gradient(#ef4444_0_25%,#facc15_25_55%,#22c55e_55_100%)] shadow-2xl shadow-cyan-500/10">
              <div className="absolute inset-6 rounded-full bg-slate-900 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">86</span>
                <span className="text-slate-400 text-sm">
                  Critical
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-300">Critical</span>
              </div>
              <span className="font-semibold">25%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="text-slate-300">Security</span>
              </div>
              <span className="font-semibold">30%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-300">Other</span>
              </div>
              <span className="font-semibold">45%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Update Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        {updateCategories.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-lg">{item.title}</h4>
              <span className="text-2xl font-bold">{item.total}</span>
            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div
                className={`${item.color} h-full rounded-full`}
                style={{ width: item.progress }}
              />
            </div>

            <div className="flex justify-between text-sm text-slate-400">
              <span>Progress</span>
              <span>{item.progress}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Distribution Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {distroData.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Distribution update statistics
                </p>
              </div>

              <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-xl text-sm font-medium">
                {item.compliant} Systems Compliant
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Donut Chart */}
              <div className="flex justify-center">
                <div className="relative w-40 h-40 rounded-full bg-[conic-gradient(#ef4444_0_10%,#f59e0b_10_35%,#22c55e_35_100%)]">
                  <div className="absolute inset-6 bg-slate-900 rounded-full flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">
                      {item.critical + item.security + item.other}
                    </span>
                    <span className="text-slate-400 text-sm">
                      Total Updates
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-5">
                <div className="bg-slate-800/70 rounded-2xl p-4 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span>Critical</span>
                  </div>
                  <span className="font-bold text-lg">{item.critical}</span>
                </div>

                <div className="bg-slate-800/70 rounded-2xl p-4 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <span>Security</span>
                  </div>
                  <span className="font-bold text-lg">{item.security}</span>
                </div>

                <div className="bg-slate-800/70 rounded-2xl p-4 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span>Other</span>
                  </div>
                  <span className="font-bold text-lg">{item.other}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
