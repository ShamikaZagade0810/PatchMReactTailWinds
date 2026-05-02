import React, { useState, useRef, useEffect }  from 'react';
import { useParams } from "react-router-dom";

const AddUser = () => {
     const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState(false);

  const [selectedType, setSelectedType] = useState("");
  const [selectedOEM, setSelectedOEM] = useState([]);
  const [selectedCustName, setSelectedCustName] = useState([]);
  const [selectedBranchName, setSelectedBranchName] = useState([]);

  const [dashboardValues, setDashboardValues] = useState([]);
  const [masterValues, setMasterValues] = useState([]);
  const [reportsValues, setReportsValues] = useState([]);
  const [contentValues, setContentValues] = useState([]);
  const [patchValues, setPatchValues] = useState([]);
  const [rightClickValues, setRightClickValues] = useState([]);

  const Type = ["Admin", "User"];
  const OEM = ["NPCIL", "NHPC"];
  const CustName = ["NPCIL", "NHPC"];
  const BranchName = ["NPCIL", "NHPC"];

  const dashboardOptions = ["Status", "Patch Tree", "Third Party"];
  const masterOptions = ["Create Application User", "View Application User", "Customer Master"];
  const reportsOptions = ["Patch Report", "Polling Interval"];
  const contentOptions = ["Manage Patches", "Send Multiple Patches"];
  const patchOptions = ["Approve Or Decline", "Automatic Approval"];
  const rightclickOptions = ["Discover Patches", "Update Now"];

  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

   const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass =
        "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";


  return (
    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-6">Add Activity Command</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* ROW 1 */}
                <div>
                    <label className={labelClass}> First Name </label>
                    <input className={inputClass} placeholder="Enter First Name" />
                </div>

                <div>
                    <label className={labelClass}> Last name </label>
                    <input className={inputClass} placeholder="Enter Last Name" />
                </div>

                <div>
                    <label className={labelClass}>Email Id </label>
                    <input className={inputClass} placeholder="Enter Email Id" />
                </div>

                {/* ROW 2 */}

                <div>
                    <label className={labelClass}> Contact Number    </label>
                    <input className={inputClass} placeholder="Enter Contact Number" />
                </div>

                <div>
                    <label className={labelClass}>Type</label>
                    <input className={inputClass} placeholder="Type" />
                </div>

                <div>
                    {/* <label className={labelClass}>Email Id </label>
                    <input className={inputClass} placeholder="Enter Email Id" /> */}
                </div>

                 {/* ROW 3 */}

                <div>
                    <label className={labelClass}> User Name </label>
                    <input className={inputClass} placeholder="Enter User Name" />
                </div>

                <div>
                    <label className={labelClass}>Password</label>
                    <input className={inputClass} placeholder="Enter Password" />
                </div>

                <div>
                    <label className={labelClass}>Confirm Password </label>
                    <input className={inputClass} placeholder="Confirm Password" />
                </div>

                {/* ROW 4 */}

                <div>
                    <label className={labelClass}> User Name </label>
                    <input className={inputClass} placeholder="Enter User Name" />
                </div>

                <div>
                    <label className={labelClass}>Customer Name(Optional)</label>
                    <input className={inputClass} placeholder="Enter Password" />
                </div>

                <div>
                    <label className={labelClass}>Branch Name(Optional) </label>
                    <input className={inputClass} placeholder="Confirm Password" />
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button className={btnClass}>Submit</button>
            </div>
        </div>
  // <div className="min-h-screen bg-gray-900 flex justify-center items-center ">
  //     <div className="bg-gray-800 text-white w-full max-w-4xl rounded-xl shadow-lg p-6">
  //       <h2 className="text-xl font-semibold mb-6">Create Application User</h2>

  //       {/* Row 1 */}
  //       <div className="grid grid-cols-2 gap-4 mb-4">
  //         <input
  //           className="input"
  //           placeholder="First Name"
  //         />
  //         <input
  //           className="input"
  //           placeholder="Last Name"
  //         />
  //       </div>

  //       {/* Row 2 */}
  //       <div className="grid grid-cols-2 gap-4 mb-4">
  //         <input className="input" placeholder="Email" />
  //         <input className="input" placeholder="Contact Number" />
  //       </div>

  //       {/* Row 3 */}
  //       <div className="grid grid-cols-2 gap-4 mb-4">
  //         <input className="input" placeholder="Username" />
  //         <input type="password" className="input" placeholder="Password" />
  //       </div>

  //       {/* Row 4 */}
  //       <div className="grid grid-cols-2 gap-4 mb-4">
  //         <input type="password" className="input" placeholder="Confirm Password" />

  //         <select
  //           className="input"
  //           value={selectedType}
  //           onChange={(e) => setSelectedType(e.target.value)}
  //         >
  //           <option value="">Select Type</option>
  //           {Type.map((t) => (
  //             <option key={t}>{t}</option>
  //           ))}
  //         </select>
  //       </div>

  //       {/* Row 5 */}
  //       <div className="grid grid-cols-2 gap-4 mb-4">
  //         <select multiple className="input">
  //           {OEM.map((o) => (
  //             <option key={o}>{o}</option>
  //           ))}
  //         </select>

  //         <select multiple className="input">
  //           {CustName.map((c) => (
  //             <option key={c}>{c}</option>
  //           ))}
  //         </select>
  //       </div>

  //       {/* Row 6 */}
  //       <div className="grid grid-cols-2 gap-4 mb-4 items-center">
  //         <select multiple className="input">
  //           {BranchName.map((b) => (
  //             <option key={b}>{b}</option>
  //           ))}
  //         </select>

  //         <button
  //           onClick={() => setVisible(true)}
  //           className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
  //         >
  //           Manage Scope
  //         </button>
  //       </div>

  //       {/* Buttons */}
  //       <div className="text-center">
  //         <button className="bg-blue-600 px-6 py-2 rounded mr-2">Submit</button>
  //         <button className="bg-gray-600 px-6 py-2 rounded">Reset</button>
  //       </div>
  //     </div>

  //     {/* Modal */}
  //     {visible && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  //         <div className="bg-white text-black w-3/4 rounded-lg p-6">
  //           <h3 className="text-lg font-semibold mb-4">
  //             Manage Application User Modules
  //           </h3>

  //           <div className="grid grid-cols-3 gap-4">
  //             {/* Dashboard */}
  //             <div>
  //               <h4 className="font-semibold mb-2">Dashboard</h4>
  //               {dashboardOptions.map((opt) => (
  //                 <label key={opt} className="block">
  //                   <input
  //                     type="checkbox"
  //                     onChange={() =>
  //                       handleCheckbox(opt, dashboardValues, setDashboardValues)
  //                     }
  //                   />{" "}
  //                   {opt}
  //                 </label>
  //               ))}
  //             </div>

  //             {/* Master */}
  //             <div>
  //               <h4 className="font-semibold mb-2">Master</h4>
  //               {masterOptions.map((opt) => (
  //                 <label key={opt} className="block">
  //                   <input
  //                     type="checkbox"
  //                     onChange={() =>
  //                       handleCheckbox(opt, masterValues, setMasterValues)
  //                     }
  //                   />{" "}
  //                   {opt}
  //                 </label>
  //               ))}
  //             </div>

  //             {/* Reports */}
  //             <div>
  //               <h4 className="font-semibold mb-2">Reports</h4>
  //               {reportsOptions.map((opt) => (
  //                 <label key={opt} className="block">
  //                   <input type="checkbox" onChange={() =>
  //                       handleCheckbox(opt, reportsValues, setReportsValues)
  //                     }
  //                   />{" "}
  //                   {opt}
  //                 </label>
  //               ))}
  //             </div>
  //           </div>

  //           <div className="text-right mt-6">
  //             <button onClick={() => setVisible(false)} className="bg-red-500 text-white px-4 py-2 rounded" > Close </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  );
};

export default AddUser;
