import React from "react";

export default function EnterpriseFirmwareRepository() {
  const firmwareRepository = [
    {
      vendor: "Fortinet",
      productFamily: "FortiGate",
      platform: "FGT-30E / 40F / 60F",
      firmwareName: "FGT_7.0.12-build0456-FORTINET.out",
      version: "7.0.12",
      releaseTrain: "FortiOS 7.0.x",
      releaseDate: "2026-05-12",
      size: "1.4 GB",
      checksum: "SHA256:A1B2-C3D4-E5F6-G7H8",
      severity: "Critical Security Update",
      cveFixed: 14,
      repositoryPath:
        "/repository/fortinet/fortios/7.0.12/",
      storageLocation: "DC-Mumbai-Repo-01",
      approvalStatus: "Approved",
      signatureStatus: "Digitally Signed",
      downloadProtocol: "HTTPS",
    },

    {
      vendor: "Cisco",
      productFamily: "Catalyst Switches",
      platform: "Catalyst 9200 / 9300",
      firmwareName:
        "cat9k_iosxe.17.09.04a.SPA.bin",
      version: "17.9.4a",
      releaseTrain: "IOS-XE Everest",
      releaseDate: "2026-04-28",
      size: "850 MB",
      checksum: "SHA256:X7Y8-Z9K0-L1M2",
      severity: "Critical Bug Fix",
      cveFixed: 9,
      repositoryPath:
        "/repository/cisco/iosxe/17.9.4a/",
      storageLocation: "DC-Pune-Repo-02",
      approvalStatus: "Approved",
      signatureStatus: "Cisco Signed",
      downloadProtocol: "SCP",
    },

    {
      vendor: "Juniper",
      productFamily: "SRX Firewall",
      platform: "SRX300 / SRX320",
      firmwareName:
        "junos-srxsme-21.4R3-S2.5.tgz",
      version: "21.4R3-S2.5",
      releaseTrain: "JunOS 21.x",
      releaseDate: "2026-03-11",
      size: "2.1 GB",
      checksum: "SHA256:P9Q8-R7S6-T5U4",
      severity: "Stability Update",
      cveFixed: 6,
      repositoryPath:
        "/repository/juniper/junos/21.4R3/",
      storageLocation: "DC-Bangalore-Repo-01",
      approvalStatus: "Approved",
      signatureStatus: "Verified",
      downloadProtocol: "SFTP",
    },

    {
      vendor: "Aruba",
      productFamily: "Mobility Controller",
      platform: "7205 / 7210",
      firmwareName:
        "ArubaOS_8.10.0.1_91111.img",
      version: "8.10.0.1",
      releaseTrain: "ArubaOS 8.x",
      releaseDate: "2026-05-18",
      size: "1.9 GB",
      checksum: "SHA256:A8B7-C6D5-E4F3",
      severity: "Feature Enhancement",
      cveFixed: 3,
      repositoryPath:
        "/repository/aruba/arubaos/8.10/",
      storageLocation: "DC-Chennai-Repo-03",
      approvalStatus: "Testing",
      signatureStatus: "Verified",
      downloadProtocol: "HTTPS",
    },

    {
      vendor: "Palo Alto",
      productFamily: "PA-Series Firewall",
      platform: "PA-220 / PA-440",
      firmwareName:
        "PanOS_10.1.11-h3_release.img",
      version: "10.1.11-h3",
      releaseTrain: "PAN-OS 10.1",
      releaseDate: "2026-05-05",
      size: "2.6 GB",
      checksum: "SHA256:F4E5-D6C7-B8A9",
      severity: "Hotfix Release",
      cveFixed: 11,
      repositoryPath:
        "/repository/paloalto/panos/10.1.11/",
      storageLocation: "DC-Hyd-Repo-02",
      approvalStatus: "Approved",
      signatureStatus: "PaloAlto Signed",
      downloadProtocol: "HTTPS",
    },

    {
      vendor: "Sophos",
      productFamily: "XG Firewall",
      platform: "XG115 / XG125",
      firmwareName:
        "SFOS_19.0.1_MR1-Release.iso",
      version: "19.0.1 MR1",
      releaseTrain: "SFOS 19",
      releaseDate: "2026-04-14",
      size: "1.2 GB",
      checksum: "SHA256:M1N2-O3P4-Q5R6",
      severity: "Maintenance Release",
      cveFixed: 4,
      repositoryPath:
        "/repository/sophos/sfos/19.0.1/",
      storageLocation: "DC-Delhi-Repo-01",
      approvalStatus: "Approved",
      signatureStatus: "Verified",
      downloadProtocol: "HTTPS",
    },

    {
      vendor: "Arista",
      productFamily: "EOS Switches",
      platform: "7050X / 7280R",
      firmwareName:
        "EOS-4.31.2F.swi",
      version: "4.31.2F",
      releaseTrain: "EOS 4.x",
      releaseDate: "2026-05-20",
      size: "980 MB",
      checksum: "SHA256:S7T8-U9V0-W1X2",
      severity: "Security Enhancement",
      cveFixed: 5,
      repositoryPath:
        "/repository/arista/eos/4.31.2F/",
      storageLocation: "DC-Mumbai-Repo-02",
      approvalStatus: "Approved",
      signatureStatus: "Verified",
      downloadProtocol: "SCP",
    },

    {
      vendor: "F5",
      productFamily: "BIG-IP",
      platform: "i2600 / i4600",
      firmwareName:
        "BIGIP-17.1.0.0.0.19.iso",
      version: "17.1.0",
      releaseTrain: "TMOS 17.x",
      releaseDate: "2026-05-01",
      size: "3.0 GB",
      checksum: "SHA256:Y3Z4-A5B6-C7D8",
      severity: "Critical Infrastructure Patch",
      cveFixed: 17,
      repositoryPath:
        "/repository/f5/bigip/17.1.0/",
      storageLocation: "DC-Pune-Repo-04",
      approvalStatus: "Approved",
      signatureStatus: "F5 Signed",
      downloadProtocol: "HTTPS",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical Security Update":
      case "Critical Infrastructure Patch":
        return "bg-red-500/20 text-red-400 border border-red-500/30";

      case "Critical Bug Fix":
      case "Hotfix Release":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";

      case "Feature Enhancement":
      case "Maintenance Release":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";

      default:
        return "bg-green-500/20 text-green-400 border border-green-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#081028] text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Enterprise Firmware Repository
          </h1>

          <p className="text-gray-400 mt-2">
            OEM firmware lifecycle management repository
          </p>
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-2xl">
          Add Firmware
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#101935] border border-gray-700 rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search firmware..."
            className="bg-[#0D1630] border border-gray-700 rounded-xl px-4 py-3"
          />

          <select className="bg-[#0D1630] border border-gray-700 rounded-xl px-4 py-3">
            <option>All Vendors</option>
            <option>Cisco</option>
            <option>Fortinet</option>
            <option>Juniper</option>
            <option>Palo Alto</option>
          </select>

          <select className="bg-[#0D1630] border border-gray-700 rounded-xl px-4 py-3">
            <option>All Severity</option>
            <option>Critical</option>
            <option>Hotfix</option>
            <option>Maintenance</option>
          </select>

          <button className="bg-cyan-600 hover:bg-cyan-700 rounded-xl">
            Search Repository
          </button>
        </div>
      </div>

      {/* Repository Cards */}
      <div className="space-y-5">
        {firmwareRepository.map((firmware, index) => (
          <div
            key={index}
            className="bg-[#101935] border border-gray-700 rounded-3xl p-6 hover:border-cyan-500 transition-all"
          >
            <div className="flex justify-between items-start">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-cyan-400">
                    {firmware.firmwareName}
                  </h2>

                  <span
                    className={`px-4 py-1 rounded-full text-sm ${getSeverityColor(
                      firmware.severity
                    )}`}
                  >
                    {firmware.severity}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">
                  <div>
                    <p className="text-gray-400">Vendor</p>
                    <p className="mt-1 font-medium">
                      {firmware.vendor}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Product Family</p>
                    <p className="mt-1 font-medium">
                      {firmware.productFamily}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Platform</p>
                    <p className="mt-1 font-medium">
                      {firmware.platform}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Version</p>
                    <p className="mt-1 font-medium text-cyan-400">
                      {firmware.version}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Release Train</p>
                    <p className="mt-1 font-medium">
                      {firmware.releaseTrain}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Release Date</p>
                    <p className="mt-1 font-medium">
                      {firmware.releaseDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">File Size</p>
                    <p className="mt-1 font-medium">
                      {firmware.size}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">CVEs Fixed</p>
                    <p className="mt-1 font-medium text-red-400">
                      {firmware.cveFixed}
                    </p>
                  </div>
                </div>

                {/* Repository Details */}
                <div className="mt-6 bg-[#0D1630] rounded-2xl p-5 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                    <div>
                      <p className="text-gray-400">
                        Repository Path
                      </p>

                      <p className="mt-2 font-mono text-green-400">
                        {firmware.repositoryPath}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Storage Location
                      </p>

                      <p className="mt-2">
                        {firmware.storageLocation}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Signature Status
                      </p>

                      <p className="mt-2 text-green-400">
                        {firmware.signatureStatus}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Download Protocol
                      </p>

                      <p className="mt-2">
                        {firmware.downloadProtocol}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-gray-400">Checksum</p>

                      <p className="mt-2 font-mono text-yellow-400 break-all">
                        {firmware.checksum}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="ml-8 flex flex-col gap-3">
                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-center border border-green-500/30">
                  {firmware.approvalStatus}
                </div>

                <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl">
                  Deploy Firmware
                </button>

                <button className="bg-[#0D1630] hover:bg-[#16244a] border border-gray-700 px-5 py-3 rounded-xl">
                  View Details
                </button>

                <button className="bg-[#0D1630] hover:bg-[#16244a] border border-gray-700 px-5 py-3 rounded-xl">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}