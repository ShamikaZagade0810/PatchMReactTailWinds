
import apiInceptor from "./apiInceptor";

//const getToken() = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3ODE1MDY4MDQsImV4cCI6MTc4MTU5MzIwNH0.9sTTgcQN78QWSubxZE5krXbssCLKysm_ohjkQsv5mao';
 const Token11 = null;


const BASE_URL = "http://192.168.0.89:8081";

export const getProjects = () =>
  apiInceptor.get(`/projectdetail/viewProjectPayload`);

export const getChanges = () =>
  apiInceptor.get(`/projectdetail/currentChangesDetails`);

export const createProject = (payload) =>
  apiInceptor.post(`/projectdetail/addProjectPayload`, payload);

export const getProjectEnvironments = (projectId) =>
  apiInceptor.get(`/environmentDataMaster/project/${projectId}`);

export const createEnvironment = (payload) =>
  apiInceptor.post(`/environmentDataMaster/newEnvironment`, payload);

export const createInstance = (payload) =>
  apiInceptor.post(`/dbInstance/dbInstanceCreate`, payload);

export const getInstances = () =>
  apiInceptor.get(`/dbInstance/getAllInstance`);

export const createPackage = (formData) =>
  apiInceptor.post(`/api/change-packages/createPackage`, formData);

export const getPackagesByProject = (projectId) =>
  apiInceptor.get(
    `/packageForm/getPackegeByProject?projectId=${projectId}`,
  );

export const getDriftsByProject = (projectId) =>
  apiInceptor.get(`/sanpshot/drift-report?projectId=${projectId}`);

export const getDrifts = () =>
  apiInceptor.get(`/sanpshot/getdrift-report`);

export const getAllDbInstances = () =>
  apiInceptor.get(`/dbInstance/getAllInstance`);

export const getPackageCount = () =>
  apiInceptor.get(`/packageForm/packageCount`);

export const approvePackage = (projectId, environmentId, packageId) =>
  apiInceptor.post(`/api/change-packages/approvePackege`, {
    projectId,
    envId: environmentId,
    packageId,
  });

export const getPackageData = () =>
  apiInceptor.get(`/api/change-packages/getPackageData`);

export const requestPackage = (payload) =>
  apiInceptor.post(`/api/change-packages/pendingPackege`, payload);

// NEWLY ADDED FUNCTIONS

export const testDbConnection = (payload) =>
  apiInceptor.post(`/dbInstance/test-connection`, payload);

export const createInstanceWithConnection = (payload) =>
  apiInceptor.post(`/dbInstance/createInstanceWithConnection`, payload);

export const getPackageDataByProjectId = (projectId) =>
  apiInceptor.get(
    `/api/change-packages/getPackageDataByProjectId?projectId=${projectId}`,
  );

export const getPackageExcutionByProjectId = (projectId) =>
  apiInceptor.get(
    `/packageForm/getPackageExcutionByProjectId?projectId=${projectId}`,
  );

export const getPackageWithoutAssign = (projectId) =>
  apiInceptor.get(
    `/packageForm/getPackageWithoutAssign?projectId=${projectId}`,
  );

export const createPackageFromDrift = ({ driftIds, projectId, payload }) => {
  const url = `/sanpshot/generate-drift-packages?driftIds=${driftIds.join(
    ",",
  )}&projectId=${projectId}`;

  return apiInceptor.post(url, payload);
};

export const generateDriftPackage = ({
  projectId,
  packageName,
  description,
  rollbackScript,
  changeset,
  preExecution,
  postExecution,
}) =>
  apiInceptor.post(`/sanpshot/generate-newDrift-packages`, {
    packageName,
    category: "DRIFT",
    description: description || "Drift package generated",
    scriptType: "LIQUIBASE_JSON",
    projectId,
    rollbackScript,
    changeset,
    preExecution,
    postExecution,
  });

export const rejectPackage = async (payload) => {
  console.log("payload in api for reject : ", payload);

  apiInceptor.post(`/api/change-packages/rejectPackage`, payload);
};

// Add to your existing projectApi.js
export const previewDriftScripts = async ({
  projectId,
  driftIds,
  preQuery,
  postQuery,
}) => {
  const token = localStorage.getItem("accessToken");
  return apiInceptor.post(
    `${API_BASE_URL}/projects/${projectId}/drifts/preview`,
    {
      driftIds,
      preQuery,
      postQuery,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    },
  );
};

// projectApi.js
export const previewRollbackScript = (payload) =>
  apiInceptor.post("/drifts/preview/rollback", payload);

export const previewChangeLogScript = (payload) =>
  apiInceptor.post("/drifts/preview/changelog", payload);

export const previewDriftPackage = async (payload) => {
  // const newr = {
  //   driftIds: [146],
  //   projectId: 1,
  // };

  console.log("payload in api ", payload);

  try {
    const res = await apiInceptor.post(
      `/sanpshot/preview-drift-package`,
      payload,
    );

    console.log("response in api:", res.data);
    return res.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
export const getDbInstancesByProjectId = (projectId) =>
  apiInceptor.get(
    `/environmentDataMaster/getInstanceByProjectType?projectId=${projectId}`,
  );

// Fetch versions for a specific schema
export const fetchVersionsForSchema = async (
  projectId,
  environmentId,
  schemaName,
) => {
  const response = await fetch(
    `/sanpshot/getVersions?projectId=${projectId}&environmentId=${environmentId}&schemaName=${schemaName}`,
  );
  if (!response.ok) throw new Error("Failed to fetch versions");
  const data = await response.json();
  return data.data || [];
};

// Fetch tables for a specific version
export const fetchTablesForVersion = async (
  projectId,
  environmentId,
  versionName,
) => {
  const response = await fetch(
    `/sanpshot/getSchemaTableIdByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,
  );
  if (!response.ok) throw new Error("Failed to fetch tables for version");
  const data = await response.json();
  return data.data || { tables: [], tableCount: 0 };
};

export const getAllDrivers = () =>
  apiInceptor.get(`/environmentDataMaster/getAllDriver`);

export const fetchTableCountForVersion = async (
  projectId,
  environmentId,
  versionName,
) => {
  const response = await fetch(
    `/sanpshot/getSchemaTableIdByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,
  );
  if (!response.ok) throw new Error("Failed to fetch table count for version");
  const data = await response.json();
  return data.data?.tableCount || 0;
};

// for file upload
export const getRollbackScript = async (data) => {
  console.log("data for rollback ", data);

  try {
    // return {
    //   success : 200,
    //   rollbackScript: "test script from backend"
    // };
    const response = apiInceptor.post(
      `/api/change-packages/fromPacakgePreview`,
      data,
    );
    console.log("response at api call in project js ", response);


    return response;
  } catch (error) {
    throw error;
  }




};
 
export const getPatches = () =>
  apiInceptor.get("/dashboard/dashboardCount");


export const getOSCount = () =>
  apiInceptor.get(`/dashboard/getOScount`);


export const getSecurityPostureData = () =>
  apiInceptor.get(`/dashboard/securityPosture`);

export const getThirdPartySeverity = () =>
  apiInceptor.get(`/dashboard/thirdpartyseverity`);

export const getThirdPartyApplisting = () =>
  apiInceptor.get(`/dashboard/thirdpartyseveritylist`);

export const getHistBarChart = () =>
  apiInceptor.get(`/dashboard/PatchHistoryBar`);

export const getIpWiseStatusData = () =>
  apiInceptor.get(`/dashboard/IPPatchStatusBar`);

export const getOsUpdatesPie = () =>
  apiInceptor.get(`/dashboard/OsPatchStatus`);

export const getOsUpdatesList = () =>
  apiInceptor.get(`/dashboard/OsPatchStatusList`);


export const getTopRiskyDevices = () =>
  apiInceptor.get(`/dashboard/TopRiskDevices`);


export const getApprovedCriticalList = () =>
  apiInceptor.get(`/dashboard/ApprvCriticalList`);

export const getCriticalPatchesList = () =>
  apiInceptor.get(`/dashboard/MissingCriticalList`);


export const getCriticalInstalledPatchesList = () =>
  apiInceptor.get(`/dashboard/ApprvCriticalList`);





export const getApprovedPatchesList = () =>
  apiInceptor.get(`/dashboard/ApprovedPatchList`);

export const getFailedIpList = () =>
  apiInceptor.get(`/dashboard/FailedList`);

export const getTotalPatchList = () =>
  apiInceptor.get(`/dashboard/TotalPatchList
`);


export const getMissingPatchList = () =>
  apiInceptor.get(`/dashboard/MissingPatchList`);



export const getWindowList = () =>
  apiInceptor.get(`/dashboard/WindowsList
`);

export const getServerList = () =>
  apiInceptor.get(`/dashboard/ServerList`);

export const getLinuxList = () =>
  apiInceptor.get(`/dashboard/LinuxList`);

export const getMacList = () =>
  apiInceptor.get(`/dashboard/MacList
`);


export const getIpWisePatchList = (inputData) =>
  apiInceptor.get(`/dashboard/IPPatchStatusBarList`, inputData
  );

export const getOSWisePatchList = (inputData) =>
  apiInceptor.get(`/dashboard/OsPatchStatusAllList`, inputData
  );


export const getthirdPartySeverityPatchList = (inputData) =>
  apiInceptor.get(`/dashboard/thirdpartyseverityAllList`, inputData
  );


export const getPatchHistoryList = (inputData) =>
  apiInceptor.get(`/dashboard/PatchHistoryList`, inputData
  );

export const getDeviceList = () =>
  apiInceptor.get(`/devices/DevicesList
`);


export const getPatchSeverityCount = (inputData) =>
  apiInceptor.get(`/devices/PatchSeverityCount`, inputData
  );

export const getPatchInstalledCount = (inputData) =>
  apiInceptor.get(`/devices/PatchInstalledCount`, inputData
  );

export const getBasicInfo = (inputData) =>
  apiInceptor.get(`/devices/BasicInfo`, inputData
  );

export const getHardwareInfo = (inputData) =>
  apiInceptor.get(`/devices/HardwareInfo`, inputData
  );

export const getComputerInfo = (inputData) =>
  apiInceptor.get(`/devices/ComputerInfo`, inputData
  );


export const getRamGraph = (inputData) =>
  apiInceptor.get(`/devices/RAMGraphInfo`, inputData
  );

export const getInstalledProgram = (inputData) =>
  apiInceptor.get(`/devices/InstallProgram`, inputData
  );


export const getInstalledPatches = (inputData) =>
  apiInceptor.get(`/devices/InstallPatch`, inputData
  );

export const getLinuxDashboardCount = () =>
  apiInceptor.get(`/LinuxDashbord/LinuxDashboardCount`);


export const getLinuxPatchStatus = () =>
  apiInceptor.get(`/LinuxDashbord/LinuxPatchStatus`);

export const getLinuxBranchWiseDevices = () =>
  apiInceptor.get(`/LinuxDashbord/LinuxBranchWiseDevices`);

export const getLinuxDeviceWiseInstallOrNeededCount = () =>
  apiInceptor.get(`/LinuxDashbord/LinuxDeviceWiseInstallOrNeededCount`);

export const getPatchActivityOvertime = () =>
  apiInceptor.get(`/LinuxDashbord/PatchActivityOvertime`);


export const getLinuxInstalledPatchList = () =>
  apiInceptor.get(`/LinuxDashbord/LinuxInstalledPatchList`);

export const getLinuxRiskyEndpoint = () =>
  apiInceptor.get(`/LinuxDashbord/LinuxRiskyDevicesList`);



export const getLinuxModalEndpointData = (inputData) =>
  apiInceptor.get(`/LinuxDashbord/LinuxModalEndpointData`, inputData
  );



export const getLinuxModalPatchData = (inputData) =>
  apiInceptor.get(`/LinuxDashbord/LinuxModalPatchData`, inputData
  );


export const getLinuxBranchwiseModal = (inputData) =>
  apiInceptor.get(`/LinuxDashbord/LinuxBranchwiseModal`, inputData
  );


export const getLinuxIpwiseModal = (inputData) =>
  apiInceptor.get(`/LinuxDashbord/LinuxIpwisewiseModal`, inputData
  );



export const getPatchReport = (inputData) =>
  apiInceptor.post(
    `/reports/GeneratePatchReport`, inputData
  );

export const getmissingPatchReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateMissingReport`, inputData
  );


export const getDeviceWiseReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateDevicewiseReport`, inputData
  );

export const getYearMonthReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateYearMonthReport`, inputData
  );

export const getAllStatusReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateAllStatusReport`, inputData
  );

export const getUpdateTimelineReport = (inputData) =>
  apiInceptor.post(
    `/reports/GeneratePatchTimelineReport`, inputData
  );

export const getdeviceAgentReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateDeviceAgentReport`, inputData
  );

export const getFailedUpdateReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateFailedUpdateReport`, inputData
  );

export const getCategoryWiseReport = (inputData) =>
  apiInceptor.post(
    `/reports/GenerateCategorywiseReport`, inputData
  );

export const getThirdPartyPatchCount = (inputData) =>
  apiInceptor.get(
    `/thirdpartyDash/PatchCount`);


export const getThirdPartyMonthlyPatchLine = (inputData) =>
  apiInceptor.get(
    `/thirdpartyDash/MonthlyPatchLine`);

export const getThirdPartyAppPatchStatusBar = (inputData) =>
  apiInceptor.get(
    `/thirdpartyDash/AppPatchStatusBar`,

  );

export const getThirdPartyIPPatchStatusChart = (inputData) =>
  apiInceptor.get(
    `/thirdpartyDash/IPPatchStatusChart`,

  );

export const getThirdPartyTopRiskyDevices = () =>
  apiInceptor.get(`/thirdpartyDash/TopRiskyDevices`);

export const getRequiredSeverityBar = () =>
  apiInceptor.get(`/thirdpartyDash/RequiredSeverityBar`);



export const getThirdPatchCountListing = (inputData) =>
  apiInceptor.post(
    `/thirdpartyDash/PatchCountListing`, inputData
  );


export const getThirdTotAppsListing = () =>
  apiInceptor.get(`/thirdpartyDash/TotalAppsListing`);

export const getThirdUpToDateAppsListing = () =>
  apiInceptor.get(`/thirdpartyDash/UptoDateAppsListing`);


export const getThirdOutDatedAppsListing = () =>
  apiInceptor.get(`/thirdpartyDash/OutDatedAppsListing`);


export const getThirdMonthltPatchList = (inputData) =>
  apiInceptor.post(
    `/thirdpartyDash/MonthltPatchList`, inputData
  );


export const getThirdAppWisePatchList = (inputData) =>
  apiInceptor.post(
    `/thirdpartyDash/AppWisePatchList`, inputData
  );

export const requestToServerForRemoteAction = (inputData) =>
  apiInceptor.post(
    `/RemoteAction/ReqToServer`, inputData
  );


export const requestIdForRemoteAction = (inputData) =>
  apiInceptor.post(
    `/RemoteAction/SelectedRequestIDList`, inputData
  );



export const AddActivityCmd = (inputData) =>
  apiInceptor.post(
    `/RunCommand/addcmdactivity`, inputData
  );

export const getActivityCmdList = () =>
  apiInceptor.get(`/RunCommand/ActivityCmdlist`);

export const getUpdateActivityCmd = (inputData) =>
  apiInceptor.put(
    `/RunCommand/updateActivityCmd`, inputData
  );

export const getdeleteActivityCmd = (inputData) =>
  apiInceptor.delete(
    `/RunCommand/deleteActivityCmd`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const sendMultiplePatches = (inputData) =>
  apiInceptor.post(
    `/patch/start`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    }
  );

// MASTER API's

//---- VIEW DEVICES
// export const ViewDeviesList = (inputData) =>
// apiInceptor.post(
//   `/master/ViewDevicesList  `,
//   inputData,
//   {
//     headers: {
//       Authorization: `Bearer ${getToken()}`
//     }
//   }
// );

//---- Add User
export const AddAppUser = (inputData) =>
  apiInceptor.post(
    `/master/addNewAppUser`, inputData
  );

export const getViewAppUserList = () =>
  apiInceptor.get(`/master/viewAllAppUser`);

export const getUpdateAppUser = (inputData) =>
  apiInceptor.put(
    `/master/updateAppUser`, inputData
  );

export const getdeleteAppUser = (inputData) =>
  apiInceptor.delete(
    `/master/deleteAppUser`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );




export const getViewDeviesList = () =>
  apiInceptor.get(`/master/ViewDevicesList`);


export const UpdateViewDevices = (inputData) =>
  apiInceptor.put(
    `/master/updateViewDevices `, inputData
  );

export const deleteViewDevices = (inputData) =>
  apiInceptor.delete(
    `/master/deleteViewDevices `,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


//---- Customer Master
export const AddCustomer = (inputData) =>
  apiInceptor.post(
    `/master/addCustomerMaster`, inputData
  );

export const getCustomerList = () =>
  apiInceptor.get(`/master/viewCustomerMaster `);

export const getUpdateCustomer = (inputData) =>
  apiInceptor.put(
    `/master/updateCustomer`, inputData
  );

export const deleteCustomer = (inputData) =>
  apiInceptor.delete(
    `/master/deleteCustomer`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


//---- Branch Master
export const AddBranch = (inputData) =>
  apiInceptor.post(
    `/master/addBranch`, inputData
  );

export const getBranchList = () =>
  apiInceptor.get(`/master/viewBranch `);

export const getUpdateBranch = (inputData) =>
  apiInceptor.put(
    `/master/editBranch`, inputData
  );

export const deleteBranch = (inputData) =>
  apiInceptor.delete(
    `/master/deleteBranch`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


//---- Group Master
export const AddGroupMaster = (inputData) =>
  apiInceptor.post(
    `/master/addGroup`, inputData
  );

export const getGroupMasterList = () =>
  apiInceptor.get(`/master/viewGroup `);

export const getUpdateGroupMaster = (inputData) =>
  apiInceptor.put(
    `/master/editGroup`, inputData
  );

export const deleteGroupMaster = (inputData) =>
  apiInceptor.delete(
    `/master/deleteGroup`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

//---- Server Master
export const AddServerMaster = (inputData) =>
  apiInceptor.post(
    `/master/addServer`, inputData
  );

export const getServerMasterList = () =>
  apiInceptor.get(`/master/viewAllServer `);

export const getUpdateServerMaster = (inputData) =>
  apiInceptor.put(
    `/master/editServer`, inputData
  );

export const deleteServerMaster = (inputData) =>
  apiInceptor.delete(
    `/master/deleteServer`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


//---- OEM Master
export const AddOEMMaster = (inputData) =>
  apiInceptor.post(
    `/master/addVendor`, inputData
  );

export const getOEMMasterList = () =>
  apiInceptor.get(`/master/viewAllVendor `);

export const getUpdateOEMMaster = (inputData) =>
  apiInceptor.put(
    `/master/updateVendor`, inputData
  );

export const deleteOEMMaster = (inputData) =>
  apiInceptor.delete(
    `/master/deleteVendor`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const uploadContentDistribution = (formData) =>
  axios.post(
    `${BASE_URL}/upload/contentDistribution`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getDownloadingPatchProgress = () =>
  apiInceptor.get(`/upload/viewDownloadingPatchProgress`);

export const addSetServerPolicy = (inputData) =>
  apiInceptor.post(
    `/master/addServerPolicy`, inputData
  );


export const viewAllServerPolicy = () =>
  apiInceptor.get(`/master/viewAllServerPolicy`);



export const editSetServerPolicy = (inputData) =>
  apiInceptor.put(
    `/master/updateServerPolicy`, inputData
  );


export const deleteSelectedPolicyServer = (inputData) =>
  apiInceptor.delete(
    `/master/deleteServerPolicy`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const addMailConfig = (inputData) =>
  apiInceptor.post(
    `/master/addMailConfig`, inputData
  );


export const viewAllMailConfig = () =>
  apiInceptor.get(`/master/viewMailConfig`);

export const editMailConfig = (inputData) =>
  apiInceptor.put(
    `/master/updateMailConfig`, inputData
  );


export const deleteSelectMailConfig = (inputData) =>
  apiInceptor.delete(
    `/master/deleteMailConfig`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const addPeriodicReport = (inputData) =>
  apiInceptor.post(
    `/master/addPeriodicReport`, inputData
  );


export const viewAllPeriodicReportList = () =>
  apiInceptor.get(`/master/viewAllPeriodicReport`);

export const editPeriodicReport = (inputData) =>
  apiInceptor.put(
    `/master/updatePeriodicReport`, inputData
  );


export const deleteSelectPeriodicReport = (inputData) =>
  apiInceptor.delete(
    `/master/deletePeriodicReport`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

// ================= SCHEDULE MULTIPLE RUN COMAND ===========

export const AddActivityScheduler = (inputData) =>
  apiInceptor.post(
    `/RunCommand/AddcmdScheduler`, inputData
  );

export const getActivitySchedulerList = () =>
  apiInceptor.get(`/RunCommand/listcmdScheduler `);

export const getUpdateActivityScheduler = (inputData) =>
  apiInceptor.put(
    `/RunCommand/updatecmdScheduler`, inputData
  );

export const deleteActivityScheduler = (inputData) =>
  apiInceptor.delete(
    `/RunCommand/deletecmdScheduler`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getUpdateStatusActivityScheduler = (inputData) =>
  apiInceptor.put(
    `/RunCommand/UpdatestatuscmdScheduler`, inputData
  );

// sumit changes  

// ================================= AUTO APPROVAL RULE PATCH SETTING ================================// 
export const AddAutoApprovalRule = async (inputData) => {
  return await apiInceptor.post(
    `/view-approval-rule/addApprovalRule`,
    inputData
  );
};


export const getAutoApprovalRule = async () => {
  return await apiInceptor.get(
    `/view-approval-rule/viewAllApprovalRule`,

  );
};


export const enableViewApprovalRule = (inputData) =>
  apiInceptor.put(
    `/view-approval-rule/enableApprovalRule/${inputData}`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const disableViewApprovalRule = (inputData) =>
  apiInceptor.put(
    `/view-approval-rule/disableApprovalRule/${inputData}`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getAutoApprovalRuleById = async (InputData) => {
  return await apiInceptor.get(
    `/view-approval-rule/viewSingleApprovalRule/${InputData}`,

  );
};


export const UpdateAutoApprovalRule = (inputData, id) =>
  apiInceptor.put(
    `/view-approval-rule/updateApprovalRule/${id}`, inputData
  );

export const deleteAutoApprovalRule = (inputData, id) =>
  apiInceptor.delete(
    `/view-approval-rule/deleteApprovalRule/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );




export const windowsOverallComplaince = () =>
  apiInceptor.get(`/dashboard/overallComplainceData`);

export const windowsComplainceDataDashboard = () =>
  apiInceptor.get(`/dashboard/complainceDataDashboard`);

// ================================= Products And Classification ================================// 

export const getProductsListing = () =>
  apiInceptor.get(`/products-classification/products`);

export const getClassificationsListing = () =>
  apiInceptor.get(`/products-classification/classifications`);

export const updateProductClass = (inputData) =>
  apiInceptor.put(
    `/products-classification/updateProductClass`, inputData
  );

export const getselectedProductsList = () =>
  apiInceptor.get(`/products-classification/selected-products`);

export const getselectedClassificationsList = () =>
  apiInceptor.get(`/products-classification/selected-classifications`);

  export const DiscoverProducts = async () => {
  return await apiInceptor.post(
    `/products-classification/discover-products`,
    
  );
};

  export const DiscoverClasification = async () => {
  return await apiInceptor.post(
    `/products-classification/discover-classifications`,
    
  );
};


export const PatchTreewsus_dashboard_statistics = () =>
  apiInceptor.get(`/PatchTree/wsus-dashboard-statistics`);


// ================================= UPDATE SYNC SCHEDULE ================================// 

export const AddUpdatesSyncSchedule = async (inputData) => {
  return await apiInceptor.post(
    `/updates-sync-schedule/saveUpdateSyncSchedule`,
    inputData
  );
};


export const getUpdatesSyncScheduleList = () =>
  apiInceptor.get(`/updates-sync-schedule/listUpdatesSyncSchedule`);


// ================================= View Synchronization Policy ================================// 


export const getAllViewSyncPolicy = () =>
  apiInceptor.get(`/client-sync/listViewSyncPolicy`);


export const deleteViewSyncPolicy = (inputData, id) =>
  apiInceptor.delete(
    `/client-sync/deleteViewSyncPolicy/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  export const RunPolicyRule = async (inputData) => {
  return await apiInceptor.post(
    `/client-sync/run-policy`,
    inputData
  );
};



// ================================= Client Wise Synchronization Policy ================================// 

export const AddClientWiseSyncPolicy = async (inputData) => {
  return await apiInceptor.post(
    `/client-sync/saveClientWiseSyncPolicy`,
    inputData
  );
};

// ================================= View Client Wise Synchronization Policy ================================// 

export const getAllViewClientWiseSyncPolicy = () =>
  apiInceptor.get(`/client-sync/listViewClientWiseSyncPolicy`);

export const updateViewClientWiseSyncPolicy = (inputData) =>
  apiInceptor.put(
    `/client-sync/updateViewClientWiseSyncPolicy`, inputData
  );


export const deleteViewClientWiseSyncPolicy = (inputData, id) =>
  apiInceptor.delete(
    `/client-sync/deleteViewClientWiseSyncPolicy/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


// ================================= Patch Tree ================================// 


export const getSynchronizeStatus = () =>
  apiInceptor.get(`/PatchTree/getSynchronizeStatus`);



export const getSyncPercent = () =>
  apiInceptor.get(`/PatchTree/getSyncPercent`);


export const stopSynchronisationProcess = () =>
  apiInceptor.get(`/PatchTree/stopSynchronisationProcess`);




export const getServerStatisticData = () =>
  apiInceptor.get(`/PatchTree/getServerStatisticData`);


export const getComputerStatusPie = (inputData) =>
  apiInceptor.get(`/PatchTree/getComputerStatusPie`, inputData
  );



export const getupdateStatus = () =>
  apiInceptor.get(`/PatchTree/getupdateStatus`);

export const getrecentActivity = () =>
  apiInceptor.get(`/PatchTree/dashboard-timeline`);


// ================================= Third Party  ================================// 

export const getThirdPartyPatchRepo = () =>
  apiInceptor.get(`/thirdparty/PatchRepository`);

export const getThirdPartyCompletedApps = (inputData) =>
  apiInceptor.get(`/thirdparty/completed-apps`, inputData
  );

export const getThirdPartyPendingApps = (inputData) =>
  apiInceptor.get(`/thirdparty/pending-apps`, inputData
  );

export const getThirdPartyFailedApps = (inputData) =>
  apiInceptor.get(`/thirdparty/failed-apps`, inputData
  );



export const getThirdPartyMissingApps = () =>
  apiInceptor.get(`/thirdparty/missing-apps `);




export const thirdPartyMissingApprovePatches = (inputData) =>
  apiInceptor.post(
    `/thirdparty/approve-missing-apps`, inputData
  );


export const getThirdPartyInstalledApps = () =>
  apiInceptor.get(`/thirdparty/installed-apps`);

export const getThirdPartyPatchStatus = () =>
  apiInceptor.get(`/thirdparty/patch-status`);


export const getThirdPartypatchprogress = () =>
  apiInceptor.get(`/thirdparty/patch-progress`);

export const getThirdPartyHostView = (inputData) =>
  apiInceptor.get(`/thirdparty/host-summary`, inputData
  );

export const getThirdPartyHostinfo = (ip) =>
  apiInceptor.get(`/thirdparty/host-info`, {
    params: { ip: ip }
  });

export const getThirdPartyHostappsdetails = (hostname, ip) =>
  apiInceptor.get(`/thirdparty/host-apps`, {
    params: {
      hostname: hostname,
      ip: ip
    }
  });

export const getThirdPartylatestSoftware = () =>
  apiInceptor.get(`/thirdparty/latest-software`);

// ================================= Linux  ================================// 
export const getLinuxMissingApps = () =>
  apiInceptor.get(`/linux/linux-missing-apps`);


export const LinuxMissingApprovePatches = (inputData) =>
  apiInceptor.post(
    `/linux/approve-missing-apps`, inputData
  );

// -----------------Linux Reports
export const getLinuxCompletedReport = (inputData) =>
  apiInceptor.post(
    `/linux-reports/linux-completed`, inputData
  );

export const getLinuxFailedReport = (inputData) =>
  apiInceptor.post(
    `/linux-reports/linux-failed`, inputData
  );

export const getLinuxPendingReport = (inputData) =>
  apiInceptor.post(
    `/linux-reports/linux-pending`, inputData
  );

export const getLinuxMissingReport = (inputData) =>
  apiInceptor.post(
    `/linux-reports/linux-missing`, inputData
  );

export const getLinuxPatchRepo = () =>
  apiInceptor.get(`/linux/LinuxRepolist`);


export const getPatchTreeMissingAppApprvDec = () =>
  apiInceptor.get(`/PatchTree/windowMissingPatches`);


export const getGroupData = () =>
  apiInceptor.get(`/PatchTree/allGroup`);


export const getWindowMissingPatchApprove = (inputData) =>
  apiInceptor.post(
    `/PatchTree/approve-decline`, inputData
  );


export const getPatchTreeTotalPatchesData = (inputData) =>
  apiInceptor.get(`/PatchTree/TotalPatchList`);


export const getSidebarServerData = () =>
  apiInceptor.get(`/PatchTree/getSidebarServer`);


export const getPatchTreePatcheStatusData = (inputData) =>
  apiInceptor.get(`/PatchTree/PatchStatusList`, inputData
  );


export const getPatchTreeUnapprovedPatchList = (inputData) =>
  apiInceptor.get(`/PatchTree/unapprovedPatchList`);

export const getSidebarGroupsData = () =>
  apiInceptor.get(`/PatchTree/getSidebarGroups`);

export const getAllUpdateData = () =>
  apiInceptor.get(`/PatchTree/getAllUpdates`);

export const getClasssifiedUpdatesData = (data) =>
  apiInceptor.post(`/PatchTree/getClassification`,
    data);

export const getpatchDetailsData = (data) =>
  apiInceptor.post(`/PatchTree/getPatchDetails`,
    data);


export const getPatchgraphPieData = (data) =>
  apiInceptor.post(`/PatchTree/getPatchgraphPie`,
    data);



export const getPatchgraphClickData = (data) =>
  apiInceptor.post(`/PatchTree/getPatchgraphClick`,
    data);

export const getPatchgroupDetailsData = (data) =>
  apiInceptor.post(`/PatchTree/getPatchgroupDetails`,
    data);

export const getGroupDataList = (data) =>
  apiInceptor.post(`/PatchTree/getGroupDataList`,
    data);

export const getgrpComputerDetails = (name) =>
  apiInceptor.get(`/PatchTree/Computerdetails`, {
    params: {
      name: name
    }
  });


export const getComputerPiechart = (name) =>
  apiInceptor.get(`/PatchTree/ComputerPiechart`, {
    params: {
      computerName: name
    }
  });

export const getComputerPieonclick = (name, status) =>
  apiInceptor.get(`/PatchTree/ComputerPieonclick`, {
    params: {
      computerName: name,
      status: status
    }
  });

export const getgrpComputerpolicy = (name) =>
  apiInceptor.get(`/PatchTree/Computerpolicy`, {
    params: {
      name: name
    }
  });

export const getsyncHistoryData = () =>
  apiInceptor.get(`/PatchTree/getSynchronizeList`);

  export const DiscoverSync = () =>
  axios.get(`${BASE_URL}/PatchTree/discoverSync`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getPatchTreeapprovedPatchList = (inputData) =>
  apiInceptor.get(`/PatchTree/approvedPatchList`);


export const getDiscoverGroup = (servername) =>
  apiInceptor.get(`/PatchTreeClick/discoverGroup`, {
    params: {
      UDstream: servername
    }
  });

export const getDiscoverComputers = (servername) =>
  apiInceptor.get(`/PatchTreeClick/discoverComputers`, {
    params: {
      UDstream: servername
    }
  });

export const getaddGroup = (groupname) =>
  apiInceptor.get(`/PatchTreeClick/addGroup`, {
    params: {
      addGroup: groupname
    }
  });

export const editGroupDetails = (data) =>
  apiInceptor.post(`/PatchTreeClick/editGroup`,
    data);

export const getPatchTreeDeclinedPatchList = (inputData) =>
  apiInceptor.get(`/PatchTree/declinedPatchList`);
export const deleteGroupDetails = (groupName) =>
  apiInceptor.post(`/PatchTreeClick/deleteGroup`, {}, {
    params: {
      groupName: groupName
    }
  });

export const addComputersDetails = (data) =>
  apiInceptor.post(`/PatchTreeClick/addComputerGroup`,
    data);


export const getdeleteComputerdetails = (inputData) =>
  apiInceptor.delete(
    `/PatchTreeClick/deleteSelectedComputers`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


// ------------------ DROPDOWN API ------------------------


export const getAllBranchList = () =>
  apiInceptor.get(`/dropdown/BranchDropdown`);


export const getBranchWiseIpaddressList = (inputData) =>
  apiInceptor.post(
    `/dropdown/IpAddressDropdown`, inputData
  );

export const getOSTypedropdown = () =>
  apiInceptor.get(`/dropdown/getOSNames`);


export const getOSComputerdropdown = (data) =>
  apiInceptor.post(`/dropdown/allPCComputer`,
    data);

export const getComputerdropdowm = (servername) =>
  apiInceptor.get(`/dropdown/allPCComputerServer`, {
    params: {
      sernm: servername
    }
  });

export const getGrouplistdropdown = () =>
  apiInceptor.get(`/dropdown/getgrouplist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getIpListdropdown = () =>
  apiInceptor.get(`/dropdown/getIpAddresslist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getClassifficationdropdown = () =>
  apiInceptor.get(`/dropdown/classificationDropdown`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });


export const getproductdropdown = () =>
  apiInceptor.get(`/dropdown/productDropdown`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterVendorNamedropdown = () =>
  apiInceptor.get(`/dropdown/getvendorlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterCustomerNamedropdown = () =>
  apiInceptor.get(`/dropdown/getcustomerlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterbranchNamedropdown = () =>
  apiInceptor.get(`/dropdown/getbranchlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterCommanddropdown = () =>
  apiInceptor.get(`/dropdown/getcommandlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getWindowsPatchdropdown = () =>
  apiInceptor.get(`/dropdown/getpatchlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });


export const getPatchedEndpointList = () =>
  apiInceptor.get(`/dashboard/PatchedEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

  export const getNonComplaintEndpointList = () =>
  apiInceptor.get(`/dashboard/NonComplaintEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

    export const getFailedEndpointList = () =>
  apiInceptor.get(`/dashboard/FailedEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

  
    export const getOfflineEndpointList = () =>
  apiInceptor.get(`/dashboard/OfflineEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });






// {
//   "title": "2025-12 Cumulative Update for Windows 11, version 25H2 for x64-based Systems (KB5072033) (26200.7462)"
// }


// http://localhost:8081/PatchTree/getClassification

// http://localhost:8081/PatchTree/getPatchDetails

// http://localhost:8081/PatchTree/getPatchgroupDetails

// http://localhost:8081/PatchTree/getPatchgraphPie  & getPatchgraphClick




// // Side bar
// http://localhost:8081/PatchTree/getSidebarServer


// http://localhost:8081/PatchTree/getSidebarGroups
