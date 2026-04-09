
import React, { useState, useEffect } from 'react';
import { Activity, Database, AlertTriangle, Info, XCircle, Server, HardDrive, Lock, Copy, AlertCircle } from 'lucide-react';

const DbMonitoringDashboard = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const CircularProgress = ({ percentage, label, size = 100 }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage > 80 ? '#ef4444' : percentage > 60 ? '#f97316' : '#06b6d4';

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth="8" />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <div className="absolute flex pt-1 pl-1 items-center justify-center " style={{ marginTop: size / 2 - 20 }}>
          <span className="text-xl font-bold dark:text-white">{percentage}%</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{label}</span>
      </div>
    );
  };

  const MetricCard = ({ title, children, icon: Icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-300 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-cyan-500" />}
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      </div>
      {children}
    </div>
  );

  const Alert = ({ type, message, time }) => {
    const styles = {
      WARNING: 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 dark:border-orange-600 text-orange-800 dark:text-orange-300',
      INFO: 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-300',
      CRITICAL: 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300'
    };
    const icons = {
      WARNING: AlertTriangle,
      INFO: Info,
      CRITICAL: XCircle
    };
    const Icon = icons[type];

    return (
      <div className={`border-l-4 p-3 mb-2 ${styles[type]}`}>
        <div className="flex items-start gap-2">
          <Icon className="w-4 h-4 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
            <p className="text-xs mt-1 opacity-75">{time}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4 border border-gray-300 dark:border-gray-700 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-cyan-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Database Monitoring</h1>
            {/* <select className="ml-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-1 text-sm">
              <option>MySQL</option>
              <option>MySQL</option>
              <option>MySQL</option>
            </select> */}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Range:</span>
            {['1h', '6h', '24h', '7d'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  timeRange === range 
                    ? 'bg-cyan-500 dark:bg-cyan-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {range}
              </button>
            ))}
            <span className="text-sm text-gray-500 dark:text-gray-400">Updated: just now</span>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-medium dark:text-white">UP</span>
            <span className="text-gray-600 dark:text-gray-400">MySQL Primary</span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">Type: <strong className="dark:text-white">MySQL</strong></span>
          <span className="text-gray-600 dark:text-gray-400">Version: <strong className="dark:text-white">8.0.35</strong></span>
          <span className="text-gray-600 dark:text-gray-400">Role: <strong className="dark:text-white">Primary</strong></span>
          <span className="text-gray-600 dark:text-gray-400">Uptime: <strong className="dark:text-white">99.97%</strong> (24h)</span>
          <span className="text-gray-600 dark:text-gray-400">Ping: <strong className="dark:text-white">2.3ms</strong></span>
          <span className="text-gray-600 dark:text-gray-400">Restarts: <strong className="dark:text-white">0</strong></span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance */}
        <MetricCard title="PERFORMANCE" icon={Activity}>
          <div className="flex justify-around mb-6">
            <CircularProgress percentage={34} label="CPU %" />
            <CircularProgress percentage={67} label="Memory %" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Swap Usage</span>
              <span className="font-medium dark:text-white">12/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '12%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Cache Hit Ratio</span>
              <span className="font-medium dark:text-white">98.7/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Load Avg</span>
              <span className="font-medium dark:text-white">1.2 / 1.4 / 1.3</span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-gray-600 dark:text-gray-400">CPU Trend</span>
              <svg className="w-full h-16 mt-2" viewBox="0 0 300 50">
                <polyline
                  points="0,35 20,30 40,32 60,28 80,25 100,30 120,28 140,32 160,29 180,31 200,27 220,30 240,28 260,32 280,30 300,28"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </MetricCard>

        {/* Connections */}
        <MetricCard title="CONNECTIONS" icon={Server}>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="50" fill="none" stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth="7" />
              <circle cx="64" cy="64" r="50" fill="none" stroke="#06b6d4" strokeWidth="7"
                strokeDasharray="314" strokeDashoffset="90" strokeLinecap="round" />
              <circle cx="64" cy="64" r="50" fill="none" stroke="#10b981" strokeWidth="7"
                strokeDasharray="314" strokeDashoffset="200" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">142</div>
              </div>
            </div>
          </div>
          <div className="flex justify-around mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Active: <strong className="dark:text-white">142</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Idle: <strong className="dark:text-white">58</strong></span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div className="bg-cyan-500 h-3 rounded-full" style={{ width: '71%' }}></div>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">Max: <strong className="dark:text-white">500</strong></div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold dark:text-white">3</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Long Running</div>
            </div>
            <div>
              <div className="text-2xl font-bold dark:text-white">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Blocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold dark:text-white">0.2</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Err/min</div>
            </div>
          </div>
        </MetricCard>

        {/* Query Throughput */}
        <MetricCard title="QUERY THROUGHPUT" icon={Activity}>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">QPS</div>
              <div className="text-xl font-bold dark:text-white">3,847</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">TPS</div>
              <div className="text-xl font-bold dark:text-white">892</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 truncate">AVG LATENCY</div>
              <div className="text-xl font-bold dark:text-white">12.4<span className="text-sm">ms</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">COMMIT</div>
              <div className="text-xl font-bold dark:text-white">8.2<span className="text-sm">ms</span></div>
            </div>
          </div>
          <svg className="w-full h-32" viewBox="0 0 600 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polyline
              points="0,60 50,55 100,58 150,52 200,50 250,55 300,52 350,57 400,54 450,56 500,53 550,55 600,52"
              fill="url(#gradient)"
              stroke="none"
            />
            <polyline
              points="0,60 50,55 100,58 150,52 200,50 250,55 300,52 350,57 400,54 450,56 500,53 550,55 600,52"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
            />
          </svg>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">QPS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">TPS</span>
            </div>
            <div className="ml-auto text-gray-500 dark:text-gray-400">P95: 45.2ms | P99: 128.5ms</div>
          </div>
        </MetricCard>

        {/* Disk & Storage */}
        <MetricCard title="DISK & STORAGE" icon={HardDrive}>
          <div className="flex justify-center mb-4">
            <CircularProgress percentage={73} label="" size={80} />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Free</span>
              <span className="font-medium dark:text-white">234 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total</span>
              <span className="font-medium dark:text-white">876 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Growth/day</span>
              <span className="font-medium dark:text-white">2.4 GB</span>
            </div>
            <hr className="my-3 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Disk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Read Latency</span>
              <span className="font-medium dark:text-white">0.8ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Write Latency</span>
              <span className="font-medium dark:text-white">1.2ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">IOPS Utilization</span>
              <span className="font-medium dark:text-white">4521/10000</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </MetricCard>

        {/* Locks & Concurrency */}
        <MetricCard title="LOCKS & CONCURRENCY" icon={Lock}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded p-4">
              <div className="text-3xl font-bold dark:text-white">45</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lock Wait (ms)</div>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded p-4">
              <div className="text-3xl font-bold dark:text-white">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Deadlocks</div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Row Lock Wait %</span>
              <span className="font-medium dark:text-white">0.3/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0.3%' }}></div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Rollback Rate %</span>
              <span className="font-medium dark:text-white">0.1/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0.1%' }}></div>
            </div>
          </div>
          <div className="mt-4 flex gap-1 h-12 items-end">
            {[40, 50, 35, 60, 25, 70, 20, 15, 80, 10, 10, 10].map((height, i) => (
              <div key={i} className="flex-1 bg-orange-400 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </MetricCard>

        {/* Replication */}
        <MetricCard title="REPLICATION" icon={Copy}>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-500 text-white rounded text-sm font-medium">Primary</span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm">Healthy</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Lag</span>
              <span className="font-medium dark:text-white">0.2s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Replicas</span>
              <span className="font-medium dark:text-white">2</span>
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">IO Thread</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">Running</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">SQL Thread</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">Running</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Failover Ready</span>
              <span className="text-green-600 dark:text-green-400">✓ Yes</span>
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">SLA Target vs Actual</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">SLA Target</div>
                  <div className="text-lg font-bold dark:text-white">99.9%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Actual</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">99.95%</div>
                </div>
              </div>
            </div>
          </div>
        </MetricCard>

        {/* Errors & Stability */}
        <MetricCard title="ERRORS & STABILITY" icon={AlertCircle}>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-500">12</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Failed/min</div>
            </div>
            <div>
              <div className="text-3xl font-bold dark:text-white">3</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Timeouts</div>
            </div>
            <div>
              <div className="text-3xl font-bold dark:text-white">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Crashes</div>
            </div>
          </div>
          <svg className="w-full h-24" viewBox="0 0 600 80">
            <polyline
              points="0,40 50,35 100,38 150,30 200,25 250,35 300,32 350,38 400,36 450,35 500,40 550,38 600,40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            />
          </svg>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">Error trend (last 20 min)</div>
        </MetricCard>

        {/* Security Signals */}
        <MetricCard title="SECURITY SIGNALS" icon={AlertTriangle}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
              <div className="text-3xl font-bold dark:text-white">7</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Failed Logins</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
              <div className="text-3xl font-bold dark:text-white">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Conn Spikes</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
              <div className="text-3xl font-bold dark:text-white">0</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Unauth Access</div>
            </div>
          </div>
        </MetricCard>

        {/* SLA & Incidents */}
        <MetricCard title="SLA & INCIDENTS" icon={Activity}>
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="50" fill="none" stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth="12" />
                <circle cx="64" cy="64" r="50" fill="none" stroke="#10b981" strokeWidth="12"
                  strokeDasharray="314" strokeDashoffset="1" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">99.95%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">24h SLA</div>
                </div>
              </div>
            </div>
          </div>
        </MetricCard>

        {/* Alerts - Full Width */}
        <div className="lg:col-span-3">
          <MetricCard title="ALERTS" icon={AlertTriangle}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded text-xs">1 Critical</span>
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs">1 Warning</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">1 Info</span>
              </div>
            </div>
            <Alert type="CRITICAL" message="Replica lag spike detected" time="5m ago" />
            <Alert type="WARNING" message="High disk usage detected (73%)" time="5m ago" />
            <Alert type="INFO" message="Scheduled backup completed" time="1h ago" />
          </MetricCard>
        </div>
      </div>
    </div>
  );
};

export default DbMonitoringDashboard;