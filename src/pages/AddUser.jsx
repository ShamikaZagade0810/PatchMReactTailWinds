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

  return (
  <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="bg-gray-800 text-white w-full max-w-4xl rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Create Application User</h2>

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="input"
            placeholder="First Name"
          />
          <input
            className="input"
            placeholder="Last Name"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Contact Number" />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="input" placeholder="Username" />
          <input type="password" className="input" placeholder="Password" />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="password" className="input" placeholder="Confirm Password" />

          <select
            className="input"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            {Type.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select multiple className="input">
            {OEM.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <select multiple className="input">
            {CustName.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Row 6 */}
        <div className="grid grid-cols-2 gap-4 mb-4 items-center">
          <select multiple className="input">
            {BranchName.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <button
            onClick={() => setVisible(true)}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Manage Scope
          </button>
        </div>

        {/* Buttons */}
        <div className="text-center">
          <button className="bg-blue-600 px-6 py-2 rounded mr-2">Submit</button>
          <button className="bg-gray-600 px-6 py-2 rounded">Reset</button>
        </div>
      </div>

      {/* Modal */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black w-3/4 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Manage Application User Modules
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {/* Dashboard */}
              <div>
                <h4 className="font-semibold mb-2">Dashboard</h4>
                {dashboardOptions.map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckbox(opt, dashboardValues, setDashboardValues)
                      }
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>

              {/* Master */}
              <div>
                <h4 className="font-semibold mb-2">Master</h4>
                {masterOptions.map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckbox(opt, masterValues, setMasterValues)
                      }
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>

              {/* Reports */}
              <div>
                <h4 className="font-semibold mb-2">Reports</h4>
                {reportsOptions.map((opt) => (
                  <label key={opt} className="block">
                    <input type="checkbox" onChange={() =>
                        handleCheckbox(opt, reportsValues, setReportsValues)
                      }
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="text-right mt-6">
              <button onClick={() => setVisible(false)} className="bg-red-500 text-white px-4 py-2 rounded" > Close </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
