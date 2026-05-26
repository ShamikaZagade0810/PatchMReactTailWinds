import React from 'react'
export default function NetworkDeviceConfigurationForm() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Network Device Configuration
            </h1>
            <p className="text-gray-500 mt-2">
              Configure discovery, backup, compliance and firmware settings
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg">
            Save Configuration
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Device Connection Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Name
                </label>
                <input
                  type="text"
                  placeholder="FortiGate Firewall"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IP Address
                </label>
                <input
                  type="text"
                  placeholder="192.168.1.1"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor
                </label>
                <select className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Fortinet</option>
                  <option>Cisco</option>
                  <option>Juniper</option>
                  <option>Aruba</option>
                  <option>Palo Alto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Protocol
                </label>
                <select className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>SNMPv3</option>
                  <option>SNMPv2</option>
                  <option>SSH</option>
                  <option>REST API</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Authentication Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="admin"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SNMP Community / Auth Key
                </label>
                <input
                  type="text"
                  placeholder="secure-community"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port
                </label>
                <input
                  type="text"
                  placeholder="161"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Configuration Backup Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Frequency
                </label>
                <select className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Time
                </label>
                <input
                  type="time"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <input type="checkbox" className="w-5 h-5" defaultChecked />
              <label className="text-gray-700 font-medium">
                Enable Automatic Configuration Backup
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Firmware Patch Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Firmware Version
                </label>
                <input
                  type="text"
                  placeholder="7.0.8"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Firmware Version
                </label>
                <input
                  type="text"
                  placeholder="7.0.12"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <input type="checkbox" className="w-5 h-5" defaultChecked />
              <label className="text-gray-700 font-medium">
                Enable Firmware Compliance Check
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Compliance Policies
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold text-gray-800">SSH Must Be Enabled</h3>
                  <p className="text-sm text-gray-500">
                    Detect devices with telnet enabled
                  </p>
                </div>

                <input type="checkbox" className="w-5 h-5" defaultChecked />
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold text-gray-800">SNMPv3 Enforcement</h3>
                  <p className="text-sm text-gray-500">
                    Restrict SNMPv1/v2 usage
                  </p>
                </div>

                <input type="checkbox" className="w-5 h-5" defaultChecked />
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Default Password Check</h3>
                  <p className="text-sm text-gray-500">
                    Detect weak or default passwords
                  </p>
                </div>

                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Configuration Validation
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Validate connectivity and policy configuration before saving
              </p>
            </div>

            <div className="flex gap-3">
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-2xl">
                Test Connection
              </button>

              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl">
                Validate Policies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
