import React, { useMemo, useState, useEffect  } from 'react';
import { useParams, useNavigate  } from "react-router-dom"
import {
  Search,
  RefreshCw,
  Download,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


import { getClasssifiedUpdatesData } from "../../api/projectApi";
import { exportTable } from '../../components/utils/exportUtils';

const SecurityUpdates = () => {
     const navigate = useNavigate();
    const handleOpen = (srNo) => {
      navigate(`/patchTree/patchDetails/${srNo}`, {
    state: {
      from: "/patchTree/SecurityUpdates"
    }
    });
    };
    
//      const securityupdateslist = [
// { srNo: 1, title: "Security Update, December 17, 2001", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-02-18 20:39:13.843", arrivalDate: "2025-12-30 06:27:55.92", approved: false, declined: false, state: "Published" },
// { srNo: 2, title: "Q311967: Security Update", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-02-18 20:23:38.527", arrivalDate: "2025-12-30 06:28:02.13", approved: false, declined: false, state: "Published" },
// { srNo: 3, title: "Security Update, February 12, 2002", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-05-06 20:12:34.28", arrivalDate: "2025-12-30 06:28:02.303", approved: false, declined: false, state: "Published" },
// { srNo: 4, title: "Q329048: Security Update", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-13 18:44:16.707", arrivalDate: "2025-12-30 06:28:09.95", approved: false, declined: false, state: "Published" },
// { srNo: 5, title: "Q320206: Security Update", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-21 18:31:54.17", arrivalDate: "2025-12-30 06:28:10.037", approved: false, declined: false, state: "Published" },
// { srNo: 6, title: "Q318138: Security Update (Windows XP)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-08-05 18:54:45.057", arrivalDate: "2025-12-30 06:28:10.15", approved: false, declined: false, state: "Published" },
// { srNo: 7, title: "Security Update, February 13, 2002 (MSXML 4.0)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-09-30 17:55:39.633", arrivalDate: "2025-12-30 06:28:10.287", approved: false, declined: false, state: "Published" },
// { srNo: 8, title: "Q323172: Security Update (Windows XP)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-11-14 01:30:42.1", arrivalDate: "2025-12-30 06:28:18.76", approved: false, declined: false, state: "Published" },
// { srNo: 9, title: "Q320920: Security Update (Windows Media Player for Windows XP)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-06-18 13:48:14.573", arrivalDate: "2025-12-30 06:28:19.013", approved: false, declined: false, state: "Published" },
// { srNo: 10, title: "Q326830: Security Update (Windows 2000)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-11-14 01:27:01.57", arrivalDate: "2025-12-30 06:28:19.123", approved: false, declined: false, state: "Published" },
// { srNo: 11, title: "Security Update (326886)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-21 18:33:24.47", arrivalDate: "2025-12-30 06:28:19.223", approved: false, declined: false, state: "Published" },
// { srNo: 12, title: "Q329414: Security Update (MDAC 2.5)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-06-24 16:20:02.02", arrivalDate: "2025-12-30 06:28:29.383", approved: false, declined: false, state: "Published" },
// { srNo: 13, title: "Security Update for Windows 2000 (329834)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-21 18:43:30.18", arrivalDate: "2025-12-30 06:28:30.053", approved: false, declined: false, state: "Published" },
// { srNo: 14, title: "Q324096: Security Update (Windows XP)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-11-14 01:24:54.46", arrivalDate: "2025-12-30 06:28:30.19", approved: false, declined: false, state: "Published" },
// { srNo: 15, title: "Q329414: Security Update (MDAC 2.6)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-21 18:48:20.95", arrivalDate: "2025-12-30 06:28:30.29", approved: false, declined: false, state: "Published" },
// { srNo: 16, title: "Security Update, February 13, 2002 (MSXML 2.6)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-21 18:44:35.447", arrivalDate: "2025-12-30 06:28:40.267", approved: false, declined: false, state: "Published" },
// { srNo: 17, title: "Q329390: Security Update", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-11-21 01:04:32.68", arrivalDate: "2025-12-30 06:28:40.347", approved: false, declined: false, state: "Published" },
// { srNo: 18, title: "Security Update, February 13, 2002 (MSXML 3.0)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-10-21 18:45:36.947", arrivalDate: "2025-12-30 06:28:40.437", approved: false, declined: false, state: "Published" },
// { srNo: 19, title: "Q329115: Security Update (Windows XP)", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-11-21 01:03:38.057", arrivalDate: "2025-12-30 06:28:46.84", approved: false, declined: false, state: "Published" },
// { srNo: 20, title: "329170: Security Update", legacyName: "NA", updateClassificationTitle: "Security Updates", installedOrNotApplicable: "NA", creationDate: "2003-11-14 01:23:03.413", arrivalDate: "2025-12-30 06:28:47.107", approved: false, declined: false, state: "Published" }
// ];
    
 const [loading, setLoading] = useState(true);
  const [securityupdateslist, setsecurityupdateslist] = useState([]);

  
    useEffect(() => {
      fetchSecurityUpdates();
    }, []);
  
    const fetchSecurityUpdates = async () => {
      try {
        setLoading(true);
  
        const data = {
          classification: "Security Updates",
        }
        const response = await getClasssifiedUpdatesData(data);
  
        console.log("Security Updates response: ", response)
        if (response?.data?.status === 200) {
          setsecurityupdateslist(response.data.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  

      const [search, setSearch] = useState('');
      const [severityFilter, setSeverityFilter] = useState('');
      const [statusFilter, setStatusFilter] = useState('');
    
      const severityOptions = [
        ...new Set( securityupdateslist.map(item => item.updateClassificationTitle) )
      ];
    
      const filteredData = useMemo(() => {
        return securityupdateslist.filter(item => {
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
    
      const totalSecurity = securityupdateslist.length;
    
      const approvedSecurity = securityupdateslist.filter( item => item.approved === true ).length;
    
      const severitySecurity = securityupdateslist.filter( item => item.updateClassificationTitle === 'Security Updates' ).length;
    

      const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 10;
const totalPages = Math.ceil(filteredData.length / rowsPerPage);

const paginatedData = useMemo(() => {
  const start = (currentPage - 1) * rowsPerPage;
  return filteredData.slice(start, start + rowsPerPage);
}, [filteredData, currentPage]);

useEffect(() => {
  setCurrentPage(1);
}, [search, severityFilter, statusFilter]);

 const exportColumns = [
    { header: "Title", key: "title", },
    { header: "Classification", key: "classification", },
    { header: "Creation Date", key: "creationDate", },
    { header: "Arrival Date", key: "arrivalDate", },
    { header: "Approved", render: row => row.approved ? "Yes" : "No", },
    { header: "Declined", render: row => row.declined ? "Yes" : "No", },
    { header: "State", key: "state", },
  ];

  const handleRefresh = async () => {
  try {
    // reset filters
    setSearch('');
    setSeverityFilter('');
    setStatusFilter('');
    setCurrentPage(1);

    // re-fetch API data
    await fetchSecurityUpdates();

  } catch (error) {
    console.error("Refresh failed:", error);
  }
};
  return (
    <div className="bg-[#050B18] rounded-xl p-2 border border-white/10 min-h-screen text-white text-sm">   
         {/* <div className="bg-[#0F172A] rounded-xl border border-white/10 p-4"> */}
   
           {/* Header */}
           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
   
             <div>
               <h1 className="text-xl font-bold"> Security Updates  </h1>   
               <p className="text-xs text-gray-400 mt-1"> Prioritized patches awaiting review and deployment. </p>
             </div>
   
             <div className="flex items-center gap-2">   
               <button onClick={handleRefresh } className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#111827] border border-[#1e293b] hover:border-cyan-500 transition-all duration-300">
                 <RefreshCw size={14} /> Refresh
               </button>   
               {/* <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
                 <Download size={14} /> Export
               </button>    */}
               <button onClick={() => {
                             console.log("Export Data ", filteredData),
                             exportTable({ type: "pdf", title: "Security Updates Report", fileName: "Security_Updates", columns: exportColumns, data: filteredData, })
                           }}
                             className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
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
                   <p className="text-[10px] text-cyan-500 uppercase tracking-wide"> Total Security </p>
                   <h2 className="text-2xl font-bold mt-1"> {totalSecurity} </h2>
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
                   <h2 className="text-2xl font-bold mt-1"> {approvedSecurity} </h2>
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
                   <h2 className="text-2xl font-bold mt-1"> {severitySecurity} </h2>
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
        Showing {paginatedData.length} of {filteredData.length}
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
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.srNo} className="border-b border-[#1e293b] hover:bg-[#111827] transition-all duration-300" >
                    {/* <td className="px-4 py-3"> {item.srNo} </td> */}

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white hover:text-cyan-400" onClick={() => handleOpen(item.title)}> {item.title} </p>
                        <p className="text-[10px] text-gray-500 mt-1"> {item.legacyName} </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] border bg-red-500/10 text-red-400 border-red-500/20">
                        {item.classification}
                      </span>
                    </td>

                    {/* <td className="px-4 py-3 text-gray-300">
                      {item.installedOrNotApplicable}
                    </td> */}

                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap"> {item.creationDate} </td>

                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap"> {item.arrivalDate} </td>

                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] border ${item.approved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`} >
                        {item.approved ? 'Approved' : 'No'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] border ${item.declined ? 'bg-red-500/10 text-red-400 border-red-500/20'
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
             <div className="flex items-center justify-between mt-4">
  <div className="text-xs text-gray-400">
    Page {currentPage} of {totalPages}
  </div>

  <div className="flex items-center gap-2">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
      className="w-8 h-8 rounded-lg border border-[#1e293b] bg-[#111827] flex items-center justify-center disabled:opacity-40"
    >
      <ChevronLeft size={15} />
    </button>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
      className="w-8 h-8 rounded-lg border border-[#1e293b] bg-[#111827] flex items-center justify-center disabled:opacity-40"
    >
      <ChevronRight size={15} />
    </button>
  </div>
</div>
           </div>    
       </div>

  )
}

export default SecurityUpdates