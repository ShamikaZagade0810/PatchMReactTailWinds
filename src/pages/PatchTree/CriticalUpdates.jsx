import React, { useMemo, useState } from 'react';
import { useParams, useNavigate  } from "react-router-dom"
import {
  Search,
  RefreshCw,
  Download,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';

const CriticalUpdates = () => {
  const navigate = useNavigate();
const handleOpen = (srNo) => {
  navigate(`/patchTree/patchDetails/${srNo}`);
};

  const criticalupdateslist = [
    {srNo:1,title:"Remote Assistance Connection",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-02-18 20:49:52.6",arrivalDate:"2025-12-30 06:27:55.633",approved:false,declined:false,state:"Published"},
    {srNo:2,title:"Windows XP Update Package, October 25, 2001",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-02-18 21:28:13.757",arrivalDate:"2025-12-30 06:27:56.01",approved:false,declined:false,state:"Published"},
    {srNo:3,title:"Critical Update, November 19, 2001",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-03-25 22:24:13.507",arrivalDate:"2025-12-30 06:27:56.083",approved:false,declined:false,state:"Published"},
    {srNo:4,title:"System Recovered Error Message Update",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-02-18 19:56:08.78",arrivalDate:"2025-12-30 06:28:02.03",approved:false,declined:false,state:"Published"},
    {srNo:5,title:"Critical Update, February 10, 2002",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-08-28 14:52:21.093",arrivalDate:"2025-12-30 06:28:02.213",approved:false,declined:false,state:"Published"},
    {srNo:6,title:"Q320174: Critical Update",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-02-20 03:09:48.407",arrivalDate:"2025-12-30 06:28:09.903",approved:false,declined:false,state:"Published"},
    {srNo:7,title:"Q329553: Critical Update (Windows 2000)",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-09-09 21:59:08.33",arrivalDate:"2025-12-30 06:28:40.593",approved:false,declined:false,state:"Published"},
    {srNo:8,title:"810565: Critical Update",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-10-15 05:15:58.963",arrivalDate:"2025-12-30 06:28:46.98",approved:false,declined:false,state:"Published"},
    {srNo:9,title:"810649: Critical Update",legacyName:"NA",updateClassificationTitle:"Critical Updates",installedOrNotApplicable:"NA",creationDate:"2003-02-25 18:41:10.857",arrivalDate:"2025-12-30 06:28:47.19",approved:false,declined:false,state:"Published"}
  ];

  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const severityOptions = [
    ...new Set( criticalupdateslist.map(item => item.updateClassificationTitle) )
  ];

  const filteredData = useMemo(() => {
    return criticalupdateslist.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity = severityFilter === '' ? true : item.updateClassificationTitle === severityFilter;

      let matchesStatus = true;
      if (statusFilter === 'approved') {
        matchesStatus = item.approved === true && item.declined === false;
      }
      if (statusFilter === 'declined') {
        matchesStatus = item.approved === false && item.declined === true;
      }

      if (statusFilter === 'unapproved') {
        matchesStatus = item.approved === false && item.declined === false;
      }
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [search, severityFilter, statusFilter]);

  const totalCritical = criticalupdateslist.length;

  const approvedCritical = criticalupdateslist.filter( item => item.approved === true ).length;

  const severityCritical = criticalupdateslist.filter( item => item.updateClassificationTitle === 'Critical Updates' ).length;

  return (
        <div className="bg-[#050B18] rounded-xl p-2 border border-white/10 min-h-screen text-white text-sm">

      {/* <div className="bg-[#0F172A] rounded-xl border border-white/10 p-4"> */}

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

          <div>
            <h1 className="text-xl font-bold">
              Critical Updates
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              Prioritized patches awaiting review and deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#111827] border border-[#1e293b] hover:border-cyan-500 transition-all duration-300">
              <RefreshCw size={14} /> Refresh
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
              <Download size={14} /> Export
            </button>

          </div>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Total Critical */}
          <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-cyan-500 uppercase tracking-wide"> Total Critical </p>
                <h2 className="text-2xl font-bold mt-1"> {totalCritical} </h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <ShieldAlert size={18} className="text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Approved Critical */}
          <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-emerald-400 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-green-500 uppercase tracking-wide"> Approved Critical </p>
                <h2 className="text-2xl font-bold mt-1"> {approvedCritical} </h2>
              </div>

              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 size={18} className="text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Severity */}
          <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-red-400 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-red-500 uppercase tracking-wide"> Severity : Critical </p>
                <h2 className="text-2xl font-bold mt-1"> {severityCritical} </h2>
              </div>

              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="bg-[#0B1220] rounded-xl p-3 border border-[#1e293b] mb-3">
  <div className="flex flex-col lg:flex-row gap-3 items-center">

    {/* Search */}
    <div className="relative flex-1">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs" />
    </div>

    {/* Status Dropdown */}
    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
      className="bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg px-3 py-2.5 text-xs min-w-[200px]" >
      <option value="" disabled>-- Please Select Status --</option>
      <option value="approved">Approved</option>
      <option value="declined">Declined</option>
      <option value="unapproved">UnApproved</option>
    </select>

    {/* Showing Count */}
    <div className="text-[11px] text-gray-400 whitespace-nowrap ml-auto">
      Showing {filteredData.length} of {criticalupdateslist.length}
    </div>

  </div>
</div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border b-1 border-[#1e293b] mt-4">
          <table className="w-full min-w-[1100px] text-xs">
            <thead className="bg-[#1e293b] border-b border-[#1e293b]">
              <tr className="text-left text-gray-300">

                {/* <th className="px-4 py-3 font-medium"> Sr No </th> */}
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium"> Classification </th>
                <th className="px-4 py-3 font-medium break-words whitespace-normal max-w-[120px]"> Installed / Not Applicable </th>
                <th className="px-4 py-3 font-medium"> Creation Date </th>
                <th className="px-4 py-3 font-medium"> Arrival Date </th>
                <th className="px-4 py-3 font-medium"> Approved </th>
                <th className="px-4 py-3 font-medium"> Declined </th>
                <th className="px-4 py-3 font-medium"> State </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.srNo} className="border-b border-[#1e293b] hover:bg-[#111827] transition-all duration-300" >
                    {/* <td className="px-4 py-3"> {item.srNo} </td> */}

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white" onClick={() => handleOpen(item.srNo)}> {item.title} </p>
                        <p className="text-[10px] text-gray-500 mt-1"> {item.legacyName} </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] border bg-red-500/10 text-red-400 border-red-500/20">
                        {item.updateClassificationTitle}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {item.installedOrNotApplicable}
                    </td>

                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap"> {item.creationDate} </td>

                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap"> {item.arrivalDate} </td>

                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] border ${
                          item.approved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`} >
                        {item.approved ? 'Approved' : 'No'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] border ${
                          item.declined ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`} >
                        {item.declined ? 'Declined' : 'No'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                        {item.state}
                      </span>
                    </td>
                  </tr>
                ))

              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-gray-400 text-xs" > No Data Available </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

     

    </div>
  )
}

export default CriticalUpdates
