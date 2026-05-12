import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Pencil, Trash2, ShieldUser } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import MultiSelect from '../../layouts/MultiSelect.jsx';

import { getViewAppUserList, getUpdateAppUser, getdeleteAppUser } from "../../api/projectApi";

const UserList = () => {
  const {
              register,
              handleSubmit,
              formState: { errors },
              watch,
              setValue
          } = useForm();

            useEffect(() => {
        initialApiReq();
    }, []);

      const initialApiReq = async () => {
           try {
                   setLoading(true);           
                   const res = await getViewAppUserList();           
                   console.log("API Response:", res);           
                   // adjust based on backend response structure
                   setAppuser(res?.data?.data || res?.data || []);           
               } catch (error) {
                   console.error("Error fetching devices:", error);
                   setAppuser([]);
               } finally {
                   setLoading(false);
               }
    
    
        }

    const [isModalOpen, setIsModalOpen] = useState(false);    
     const [editData, setEditData] = useState(null);
     const [isResetModalOpen, setIsResetModalOpen] = useState(false);
     const [resetData, setResetData] = useState({ username: "", password: "",  confirmPassword: "" });

 const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

        const [Appuser, setAppuser] = useState([]);
     const [loading, setLoading] = useState(false);
    
     
    const OEMOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];
    const CustNameOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];
    const branchOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];

  const users = [
  { username: "Demotest", type: "admin", contactNo: "8431368984", emailId: "admintest12@gmail.com", firstName: "Demo", lastName: "Test" , OEMNames : [  { label: "NPCIL", value: "NPCIL" }]   },  
  { username: "poc", type: "admin", contactNo: "7045111313", emailId: "j@velox.co.in", firstName: "Abhudayu", lastName: "Bank",  OEMNames : [ { label: "NPCIL", value: "NPCIL" }, { label: "NHPC", value: "NHPC" }]  },
  { username: "tester", type: "User", contactNo: "1234567890", emailId: "tester@gmail.com", firstName: "tester", lastName: "new" }
];



    // populate data in edit modal
  const handleEdit = (item, index) => {
    console.log("Edit clicked:", item);
    const formattedOEM = (item.oemName || []).map((val) => ({ label: val, value: val }));
    const formattedBranch = (item.branchName || []).map((val) => ({ label: val, value: val }));
    const formattedCustomer = item.customerName ? item.customerName.split(",").map((val) => ({ label: val.trim(), value: val.trim() })) : [];
    const updatedItem = {
        ...item,
        OEMNames: formattedOEM,
        branchNames: formattedBranch,
        CustNames: formattedCustomer
    };
    setEditData(updatedItem);
    setIsModalOpen(true);
};

const handleUpdateUser = async () => {
    try {
        const inputData = {
            id: editData?.srNo,
            firstName: editData?.firstName,
            lastName: editData?.lastName,
            emailId: editData?.emailId,
            contactNo: editData?.contactNo,
            username: editData?.username,
            // if password not available remove these 2 fields
            password: editData?.password || "",
            confirmPassword: editData?.confirmPassword || "",
            type: editData?.type,
            oem: (editData?.OEMNames || []).map( (item) => item.value ),
            customerNames: (editData?.CustNames || []).map( (item) => item.value ),
            branchNames: (editData?.branchNames || []).map( (item) => item.value )
        };

        console.log("Update Payload :", inputData);
        const response = await getUpdateAppUser(inputData);
        console.log("Update Response :", response?.data);
         console.log("Update Response Satus:", response?.data.status);
        // alert("User Updated Successfully");
        if(response.data.status === 200){
                         toast.success(response.data.message);
                        setIsModalOpen(false);
                    }
                     else if (response.data.status === 409) {
                                    toast.warning(response.data.message);
                                }
                    else {
                        toast.error(response.data.message);
                   }
        setIsModalOpen(false);
        initialApiReq();

    } catch (error) {

        console.error("Update Error :", error);

        alert(
            error?.response?.data?.message ||
            "Failed to update user"
        );
    }
};

    const handleRestPass = (item, index) => {
        console.log("Reset clicked:", item);
        // setEditData(item);     // store selected row
         setResetData({
    username: item.username,
    password: "",
    confirmPassword: ""
  }); setIsResetModalOpen(true);
    };


       // DELETE COMMAND
        
    
   const handleDelete = (item) => {
    console.log("item:", item);  
        setDeleteId(item.srNo); // or item.srNo       
        setIsDeleteOpen(true);
    };
    const confirmDelete = async () => {
         console.log("deleteId:", deleteId);
         console.log("type of deleteId:", typeof deleteId);
        try {
            const payload = {
                id: deleteId
            };
            // await getdeleteActivityCmd(payload); // your API
             console.log("Delete Payload:", payload);
            const response = await getdeleteAppUser(payload);    
            // toast.success("Deleted successfully");
             if(response.data.status === 200){
                         toast.success(response.data.message);
                        setIsModalOpen(false);
                    }
            else if (response.data.status === 409) { toast.warning(response.data.message); }
            else { toast.error(response.data.message); }
    
            setIsDeleteOpen(false);
            setDeleteId(null);
    
            // refresh table
            initialApiReq();
    
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };
    
    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
 const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    
  return (
    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
                View Application User   
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                        <tr>
                            <th className="p-3 text-left">User Name</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Contact No</th>
                            <th className="p-3 text-left">Email Id</th>
                            <th className="p-3 text-left">First Name</th>
                            <th className="p-3 text-left">Last Name</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                      {loading ? (
        <tr>
            <td colSpan="7" className="p-4 text-center text-gray-400">
                Loading devices...
            </td>
        </tr>
    ) : Appuser.length === 0 ? (
        <tr>
            <td colSpan="7" className="p-4 text-center text-gray-400">
                No devices found
            </td>
        </tr>
    ) : (
                        Appuser.map((item, index) => (
                            <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                <td className="p-3">{item.username}</td>
                                <td className="p-3">{item.type}</td>
                                <td className="p-3">{item.contactNo}</td>
                                <td className="p-3">{item.emailId}</td>
                                <td className="p-3">{item.firstName}</td>
                                <td className="p-3">{item.lastName}</td>                                
                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-2">

                                        {/* Edit Button */}
                                        <button className="px-2 py-1 text-xs text-blue-400 hover:text-blue-500 rounded-md hover:bg-blue-500/30 transition"
                                            onClick={() => handleEdit(item, index)} > <Pencil size={20} /> </button>

                                        {/* Delete Button */}
                                        <button className="px-2 py-1 text-xs  text-red-400 hover:text-red-500 rounded-md hover:bg-red-500/30 transition"
                                           onClick={() => handleDelete(item)}><Trash2 size={20} /> </button>

                                        {/* Reset Password Button */}
                                        <button className="px-2 py-1 text-xs text-amber-400 hover:text-amber-500 rounded-md hover:bg-amber-500/30 transition"
                                            onClick={() => handleRestPass(item, index)}><ShieldUser size={22} /> </button>                                            

                                    </div>
                                </td>
                            </tr>
                        ))
                            )}
                    </tbody>
                </table>

                {/* EDIT MODAL */}
                {isModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    {/* Modal Box */}
    <div className="bg-[#0B1220] rounded-2xl p-6 w-[700px] border border-white/10 shadow-xl">

      <h2 className="text-lg font-semibold mb-6">Update User Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* First Name */}
        <div>
          <label className={labelClass}>First Name</label>
          <input
            className={inputClass}
            value={editData?.firstName || ""}
            onChange={(e) =>
              setEditData({ ...editData, firstName: e.target.value })
            }
          />
        </div>

        {/* Last Name */}
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            className={inputClass}
            value={editData?.lastName || ""}
            onChange={(e) =>
              setEditData({ ...editData, lastName: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email ID</label>
          <input
            type="email"
            className={inputClass}
            value={editData?.emailId || ""}
            onChange={(e) =>
              setEditData({ ...editData, emailId: e.target.value })
            }
          />
        </div>

        {/* Contact */}
        <div>
          <label className={labelClass}>Contact No</label>
          <input
            type="tel"
            className={inputClass}
            value={editData?.contactNo || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                contactNo: e.target.value.replace(/[^0-9]/g, "")
              })
            }
          />
        </div>

        {/* Username */}
        <div>
          <label className={labelClass}>User Name</label>
          <input
            className={inputClass}
            value={editData?.username || ""}
            onChange={(e) => setEditData({ ...editData, username: e.target.value }) }
          />
        </div>

        {/* Type */}
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass}
            value={editData?.type || ""}
            onChange={(e) => 
              setEditData({ ...editData, type: e.target.value }) } >
            <option value="">-- Please select value --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* OEM */}
        
              <div>
  <label className={labelClass}>OEM</label>
  <MultiSelect
    options={OEMOptions}
    value={editData?.OEMNames || []}
    onChange={(val) => {
      setEditData({ ...editData, OEMNames: val });
      setValue("OEMNames", val); // sync with react-hook-form if needed
    }}
    placeholder="Select OEM Names"
    id={"OEMNames"}
    setValue={setValue}
  />
</div>

       
      {/* Customer Name */}
<div>
  <label className={labelClass}>Customer Name</label>
  <MultiSelect
    options={CustNameOptions}
    value={editData?.CustNames || []}
    onChange={(val) => {
      setEditData({ ...editData, CustNames: val });
      setValue("CustNames", val);
    }}
    placeholder="Select Customer Names"
    id={"CustNames"}
    setValue={setValue}
  />
</div>

  {/* Branch Name */}
<div>
  <label className={labelClass}>Branch Name</label>
  <MultiSelect
    options={branchOptions}
    value={editData?.branchNames || []}
    onChange={(val) => {
      setEditData({ ...editData, branchNames: val });
      setValue("branchNames", val);
    }}
    placeholder="Select Customer Names"
    id={"branchNames"}
    setValue={setValue}
  />
  </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="px-4 py-2 text-gray-400 hover:text-white" onClick={() => setIsModalOpen(false)} > Cancel </button>
        <button className={btnClass} onClick={handleUpdateUser}> Update </button>
      </div>
    </div>
  </div>
)}

{isResetModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#0B1220] rounded-2xl p-6 w-[400px] border border-white/10 shadow-xl">

      <h2 className="text-lg font-semibold mb-6">Reset Password</h2>

      <div className="grid gap-4">

        {/* Username */}
        <div>
          <label className={labelClass}>User Name</label>
          <input
            className={inputClass}
            value={resetData.username}
            disabled
          />
        </div>

        {/* New Password */}
        <div>
          <label className={labelClass}>New Password</label>
          <input
            type="password"
            className={inputClass}
            value={resetData.password}
            onChange={(e) =>
              setResetData({ ...resetData, password: e.target.value })
            }
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelClass}>Confirm Password</label>
          <input
            type="password"
            className={inputClass}
            value={resetData.confirmPassword}
            onChange={(e) =>
              setResetData({ ...resetData, confirmPassword: e.target.value })
            }
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          className="px-4 py-2 text-gray-400 hover:text-white"
          onClick={() => setIsResetModalOpen(false)}
        >
          Cancel
        </button>

        <button
          className={btnClass}
          onClick={() => {
            if (resetData.password !== resetData.confirmPassword) {
              alert("Passwords do not match");
              return;
            }

            console.log("Reset Password Data:", resetData);
            setIsResetModalOpen(false);
          }}
        >
          Update
        </button>

      </div>

    </div>
  </div>
)}


{/* Delete MODAL */}
 {isDeleteOpen && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/10 w-[400px] shadow-xl">

            <h2 className="text-lg font-semibold mb-4">
                Confirm Delete
            </h2>

            <p className="text-gray-300 mb-6">
                Are you sure you want to delete this activity?
            </p>

            <div className="flex justify-end gap-3">

                <button
                    className="px-4 py-2 text-gray-400"
                    onClick={() => setIsDeleteOpen(false)}
                >
                    Cancel
                </button>

                <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={confirmDelete}>
                    Yes, Delete
                </button>

            </div>

        </div>

    </div>
)}
            </div>
        </div>
  )
}

export default UserList