import React from 'react'

export default function FirmwareInventoryDashboard() {

  const firmwareRepository = [
    {
      fileName: 'FGT_7.0.12-build0456-FORTINET.out',
      vendor: 'Fortinet',
      product: 'FortiGate',
      platform: 'FGT-30E / 40F / 60F',
      version: '7.0.12',
      releaseTrain: 'FortiOS 7.0.x',
      releaseDate: '20-May-2026',
      size: '1.4 GB',
      checksum: 'SHA256:A1B2-C3D4-E5F6-G7H8',
      severity: 'Critical Security Update',
      cveFixed: 14,
      repositoryPath: '/repository/fortinet/fortios/7.0.12/',
      approval: 'Approved',
    },

    {
      fileName: 'cat9k_iosxe.17.09.04a.SPA.bin',
      vendor: 'Cisco',
      product: 'Catalyst Switches',
      platform: '9200 / 9300',
      version: '17.9.4a',
      releaseTrain: 'IOS-XE Everest',
      releaseDate: '18-May-2026',
      size: '850 MB',
      checksum: 'SHA256:X7Y8-Z9K0-L1M2',
      severity: 'Critical Bug Fix',
      cveFixed: 9,
      repositoryPath: '/repository/cisco/iosxe/17.9.4a/',
      approval: 'Approved',
    },

    {
      fileName: 'junos-srxsme-21.4R3-S2.5.tgz',
      vendor: 'Juniper',
      product: 'SRX Firewall',
      platform: 'SRX300 / SRX320',
      version: '21.4R3-S2.5',
      releaseTrain: 'JunOS 21.x',
      releaseDate: '10-May-2026',
      size: '2.1 GB',
      checksum: 'SHA256:P9Q8-R7S6-T5U4',
      severity: 'Stability Update',
      cveFixed: 6,
      repositoryPath: '/repository/juniper/junos/21.4R3/',
      approval: 'Approved',
    },

    {
      fileName: 'ArubaOS_8.10.0.1_91111.img',
      vendor: 'Aruba',
      product: 'Mobility Controller',
      platform: '7205 / 7210',
      version: '8.10.0.1',
      releaseTrain: 'ArubaOS 8.x',
      releaseDate: '22-May-2026',
      size: '1.9 GB',
      checksum: 'SHA256:A8B7-C6D5-E4F3',
      severity: 'Feature Enhancement',
      cveFixed: 3,
      repositoryPath: '/repository/aruba/arubaos/8.10/',
      approval: 'Testing',
    },

    {
      fileName: 'PanOS_10.1.11-h3_release.img',
      vendor: 'Palo Alto',
      product: 'PA-Series Firewall',
      platform: 'PA-220 / PA-440',
      version: '10.1.11-h3',
      releaseTrain: 'PAN-OS 10.1',
      releaseDate: '16-May-2026',
      size: '2.6 GB',
      checksum: 'SHA256:F4E5-D6C7-B8A9',
      severity: 'Hotfix Release',
      cveFixed: 11,
      repositoryPath: '/repository/paloalto/panos/10.1.11/',
      approval: 'Approved',
    },

    {
      fileName: 'SFOS_19.0.1_MR1-Release.iso',
      vendor: 'Sophos',
      product: 'XG Firewall',
      platform: 'XG115 / XG125',
      version: '19.0.1 MR1',
      releaseTrain: 'SFOS 19',
      releaseDate: '14-May-2026',
      size: '1.2 GB',
      checksum: 'SHA256:M1N2-O3P4-Q5R6',
      severity: 'Maintenance Release',
      cveFixed: 4,
      repositoryPath: '/repository/sophos/sfos/19.0.1/',
      approval: 'Approved',
    },

    {
      fileName: 'EOS-4.31.2F.swi',
      vendor: 'Arista',
      product: 'EOS Switches',
      platform: '7050X / 7280R',
      version: '4.31.2F',
      releaseTrain: 'EOS 4.x',
      releaseDate: '25-May-2026',
      size: '980 MB',
      checksum: 'SHA256:S7T8-U9V0-W1X2',
      severity: 'Security Enhancement',
      cveFixed: 5,
      repositoryPath: '/repository/arista/eos/4.31.2F/',
      approval: 'Approved',
    },

    {
      fileName: 'BIGIP-17.1.0.0.0.19.iso',
      vendor: 'F5',
      product: 'BIG-IP',
      platform: 'i2600 / i4600',
      version: '17.1.0',
      releaseTrain: 'TMOS 17.x',
      releaseDate: '12-May-2026',
      size: '3.0 GB',
      checksum: 'SHA256:Y3Z4-A5B6-C7D8',
      severity: 'Critical Infrastructure Patch',
      cveFixed: 17,
      repositoryPath: '/repository/f5/bigip/17.1.0/',
      approval: 'Approved',
    },
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {

      case 'Critical Security Update':
      case 'Critical Infrastructure Patch':
        return 'bg-red-100 text-red-700'

      case 'Critical Bug Fix':
      case 'Hotfix Release':
        return 'bg-orange-100 text-orange-700'

      case 'Feature Enhancement':
        return 'bg-blue-100 text-blue-700'

      default:
        return 'bg-green-100 text-green-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Enterprise Firmware Repository
            </h1>

            <p className="text-gray-500 mt-2">
              OEM firmware lifecycle and patch repository management
            </p>
          </div>

          <div className="flex gap-3">

            <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg">
              Sync OEM Repository
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg">
              Upload Firmware
            </button>

          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">
              Repository Files
            </h2>

            <p className="text-3xl font-bold mt-3 text-blue-600">
              248
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">
              Critical Patches
            </h2>

            <p className="text-3xl font-bold mt-3 text-red-600">
              38
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">
              OEM Vendors
            </h2>

            <p className="text-3xl font-bold mt-3 text-green-600">
              14
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">
              Repository Size
            </h2>

            <p className="text-3xl font-bold mt-3 text-purple-600">
              4.8 TB
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search firmware..."
              className="border rounded-xl px-4 py-3"
            />

            <select className="border rounded-xl px-4 py-3">
              <option>All Vendors</option>
              <option>Cisco</option>
              <option>Fortinet</option>
              <option>Juniper</option>
              <option>Palo Alto</option>
              <option>F5</option>
            </select>

            <select className="border rounded-xl px-4 py-3">
              <option>All Severity</option>
              <option>Critical</option>
              <option>Hotfix</option>
              <option>Maintenance</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Search Repository
            </button>

          </div>
        </div>

        {/* Firmware Repository */}
        <div className="space-y-5">

          {firmwareRepository.map((firmware, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
            >

              <div className="flex justify-between items-start">

                {/* Left */}
                <div className="flex-1">

                  <div className="flex items-center gap-4 mb-4">

                    <h2 className="text-2xl font-bold text-blue-700">
                      {firmware.fileName}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                        firmware.severity
                      )}`}
                    >
                      {firmware.severity}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Vendor
                      </p>

                      <p className="font-semibold mt-1">
                        {firmware.vendor}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Product
                      </p>

                      <p className="font-semibold mt-1">
                        {firmware.product}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Platform
                      </p>

                      <p className="font-semibold mt-1">
                        {firmware.platform}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Version
                      </p>

                      <p className="font-semibold mt-1 text-blue-600">
                        {firmware.version}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Release Train
                      </p>

                      <p className="font-semibold mt-1">
                        {firmware.releaseTrain}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Release Date
                      </p>

                      <p className="font-semibold mt-1">
                        {firmware.releaseDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        File Size
                      </p>

                      <p className="font-semibold mt-1">
                        {firmware.size}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        CVEs Fixed
                      </p>

                      <p className="font-semibold mt-1 text-red-600">
                        {firmware.cveFixed}
                      </p>
                    </div>

                  </div>

                  {/* Repo Info */}
                  <div className="bg-gray-100 rounded-2xl p-5 mt-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>
                        <p className="text-gray-500 text-sm">
                          Repository Path
                        </p>

                        <p className="font-mono text-green-700 mt-2 break-all">
                          {firmware.repositoryPath}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">
                          Checksum
                        </p>

                        <p className="font-mono text-orange-600 mt-2 break-all">
                          {firmware.checksum}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Right */}
                <div className="ml-8 flex flex-col gap-3">

                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-center font-medium">
                    {firmware.approval}
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
                    Deploy Firmware
                  </button>

                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-xl">
                    Download
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Event Logs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="p-5 border-b flex items-center justify-between">

            <h2 className="text-2xl font-semibold text-gray-800">
              Repository Synchronization Logs
            </h2>

            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm">
              Export Logs
            </button>

          </div>

          <div className="bg-gray-900 text-green-400 p-5 font-mono text-sm overflow-x-auto">

            <pre>
              {`[INFO] OEM repository synchronization started
[INFO] Cisco firmware repository synchronized
[INFO] Fortinet firmware metadata validated
[WARNING] Aruba firmware pending approval
[ALERT] Critical Palo Alto hotfix imported
[SUCCESS] Repository integrity verification completed
[INFO] 248 firmware packages available`}
            </pre>

          </div>

        </div>

      </div>

    </div>
  )
}