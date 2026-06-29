
import apiInceptor from "./apiInceptor"; 

//const getToken() = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3ODE1MDY4MDQsImV4cCI6MTc4MTU5MzIwNH0.9sTTgcQN78QWSubxZE5krXbssCLKysm_ohjkQsv5mao';
 const Token11 = null;

// const BASE_URL = "/";
 const BASE_URL = "http://192.168.0.17:8081";

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
  apiInceptor.get("/api/dashboard/dashboardCount");


export const getOSCount = () =>
  apiInceptor.get(`/api/dashboard/getOScount`);


export const getSecurityPostureData = () =>
  apiInceptor.get(`/api/dashboard/securityPosture`);

export const getThirdPartySeverity = () =>
  apiInceptor.get(`/api/dashboard/thirdpartyseverity`);

export const getThirdPartyApplisting = () =>
  apiInceptor.get(`/api/dashboard/thirdpartyseveritylist`);

export const getHistBarChart = () =>
  apiInceptor.get(`/api/dashboard/PatchHistoryBar`);

export const getIpWiseStatusData = () =>
  apiInceptor.get(`/api/dashboard/IPPatchStatusBar`);

export const getOsUpdatesPie = () =>
  apiInceptor.get(`/api/dashboard/OsPatchStatus`);

export const getOsUpdatesList = () =>
  apiInceptor.get(`/api/dashboard/OsPatchStatusList`);


export const getTopRiskyDevices = () =>
  apiInceptor.get(`/api/dashboard/TopRiskDevices`);


export const getApprovedCriticalList = () =>
  apiInceptor.get(`/api/dashboard/ApprvCriticalList`);

export const getCriticalPatchesList = () =>
  apiInceptor.get(`/api/dashboard/MissingCriticalList`);


export const getCriticalInstalledPatchesList = () =>
  apiInceptor.get(`/api/dashboard/ApprvCriticalList`);





export const getApprovedPatchesList = () =>
  apiInceptor.get(`/api/dashboard/ApprovedPatchList`);

export const getFailedIpList = () =>
  apiInceptor.get(`/api/dashboard/FailedList`);

export const getTotalPatchList = () =>
  apiInceptor.get(`/api/dashboard/TotalPatchList
`);


export const getMissingPatchList = () =>
  apiInceptor.get(`/api/dashboard/MissingPatchList`);



export const getWindowList = () =>
  apiInceptor.get(`/api/dashboard/WindowsList
`);

export const getServerList = () =>
  apiInceptor.get(`/api/dashboard/ServerList`);

export const getLinuxList = () =>
  apiInceptor.get(`/api/dashboard/LinuxList`);

export const getMacList = () =>
  apiInceptor.get(`/api/dashboard/MacList
`);


export const getIpWisePatchList = (inputData) =>
  apiInceptor.get(`/api/dashboard/IPPatchStatusBarList`, inputData
  );

export const getOSWisePatchList = (inputData) =>
  apiInceptor.get(`/api/dashboard/OsPatchStatusAllList`, inputData
  );


export const getthirdPartySeverityPatchList = (inputData) =>
  apiInceptor.get(`/api/dashboard/thirdpartyseverityAllList`, inputData
  );


export const getPatchHistoryList = (inputData) =>
  apiInceptor.get(`/api/dashboard/PatchHistoryList`, inputData
  );

export const getDeviceList = () =>
  apiInceptor.get(`/api/devices/DevicesList
`);


export const getPatchSeverityCount = (inputData) =>
  apiInceptor.get(`/api/devices/PatchSeverityCount`, inputData
  );

export const getPatchInstalledCount = (inputData) =>
  apiInceptor.get(`/api/devices/PatchInstalledCount`, inputData
  );

export const getBasicInfo = (inputData) =>
  apiInceptor.get(`/api/devices/BasicInfo`, inputData
  );

export const getHardwareInfo = (inputData) =>
  apiInceptor.get(`/api/devices/HardwareInfo`, inputData
  );

export const getComputerInfo = (inputData) =>
  apiInceptor.get(`/api/devices/ComputerInfo`, inputData
  );


export const getRamGraph = (inputData) =>
  apiInceptor.get(`/api/devices/RAMGraphInfo`, inputData
  );

export const getInstalledProgram = (inputData) =>
  apiInceptor.get(`/api/devices/InstallProgram`, inputData
  );


export const getInstalledPatches = (inputData) =>
  apiInceptor.get(`/api/devices/InstallPatch`, inputData
  );

export const getLinuxDashboardCount = () =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxDashboardCount`);


export const getLinuxPatchStatus = () =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxPatchStatus`);

export const getLinuxBranchWiseDevices = () =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxBranchWiseDevices`);

export const getLinuxDeviceWiseInstallOrNeededCount = () =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxDeviceWiseInstallOrNeededCount`);

export const getPatchActivityOvertime = () =>
  apiInceptor.get(`/api/LinuxDashbord/PatchActivityOvertime`);


export const getLinuxInstalledPatchList = () =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxInstalledPatchList`);

export const getLinuxRiskyEndpoint = () =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxRiskyDevicesList`);



export const getLinuxModalEndpointData = (inputData) =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxModalEndpointData`, inputData
  );



export const getLinuxModalPatchData = (inputData) =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxModalPatchData`, inputData
  );


export const getLinuxBranchwiseModal = (inputData) =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxBranchwiseModal`, inputData
  );


export const getLinuxIpwiseModal = (inputData) =>
  apiInceptor.get(`/api/LinuxDashbord/LinuxIpwisewiseModal`, inputData
  );



export const getPatchReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GeneratePatchReport`, inputData
  );

export const getmissingPatchReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateMissingReport`, inputData
  );


export const getDeviceWiseReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateDevicewiseReport`, inputData
  );

export const getYearMonthReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateYearMonthReport`, inputData
  );

export const getAllStatusReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateAllStatusReport`, inputData
  );

export const getUpdateTimelineReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GeneratePatchTimelineReport`, inputData
  );

export const getdeviceAgentReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateDeviceAgentReport`, inputData
  );

export const getFailedUpdateReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateFailedUpdateReport`, inputData
  );

export const getCategoryWiseReport = (inputData) =>
  apiInceptor.post(
    `/api/reports/GenerateCategorywiseReport`, inputData
  );

export const getThirdPartyPatchCount = (inputData) =>
  apiInceptor.get(
    `/api/thirdpartyDash/PatchCount`);


export const getThirdPartyMonthlyPatchLine = (inputData) =>
  apiInceptor.get(
    `/api/thirdpartyDash/MonthlyPatchLine`);

export const getThirdPartyAppPatchStatusBar = (inputData) =>
  apiInceptor.get(
    `/api/thirdpartyDash/AppPatchStatusBar`,

  );

export const getThirdPartyIPPatchStatusChart = (inputData) =>
  apiInceptor.get(
    `/api/thirdpartyDash/IPPatchStatusChart`,

  );

export const getThirdPartyTopRiskyDevices = () =>
  apiInceptor.get(`/api/thirdpartyDash/TopRiskyDevices`);

export const getRequiredSeverityBar = () =>
  apiInceptor.get(`/api/thirdpartyDash/RequiredSeverityBar`);



export const getThirdPatchCountListing = (inputData) =>
  apiInceptor.post(
    `/api/thirdpartyDash/PatchCountListing`, inputData
  );


export const getThirdTotAppsListing = () =>
  apiInceptor.get(`/api/thirdpartyDash/TotalAppsListing`);

export const getThirdUpToDateAppsListing = () =>
  apiInceptor.get(`/api/thirdpartyDash/UptoDateAppsListing`);


export const getThirdOutDatedAppsListing = () =>
  apiInceptor.get(`/api/thirdpartyDash/OutDatedAppsListing`);


export const getThirdMonthltPatchList = (inputData) =>
  apiInceptor.post(
    `/api/thirdpartyDash/MonthltPatchList`, inputData
  );


export const getThirdAppWisePatchList = (inputData) =>
  apiInceptor.post(
    `/api/thirdpartyDash/AppWisePatchList`, inputData
  );

export const requestToServerForRemoteAction = (inputData) =>
  apiInceptor.post(
    `/api/RemoteAction/ReqToServer`, inputData
  );


export const requestIdForRemoteAction = (inputData) =>
  apiInceptor.post(
    `/api/RemoteAction/SelectedRequestIDList`, inputData
  );



export const AddActivityCmd = (inputData) =>
  apiInceptor.post(
    `/api/RunCommand/addcmdactivity`, inputData
  );

export const getActivityCmdList = () =>
  apiInceptor.get(`/api/RunCommand/ActivityCmdlist`);

export const getUpdateActivityCmd = (inputData) =>
  apiInceptor.put(
    `/api/RunCommand/updateActivityCmd`, inputData
  );

export const getdeleteActivityCmd = (inputData) =>
  apiInceptor.delete(
    `/api/RunCommand/deleteActivityCmd`, );

export const sendMultiplePatches = (inputData) =>
  apiInceptor.post( `/api/patch/start`, inputData, );

// MASTER API's

//---- VIEW DEVICES
// export const ViewDeviesList = (inputData) =>
// apiInceptor.post(
//   `/api/master/ViewDevicesList  `,
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
    `/api/master/addNewAppUser`, inputData
  );

export const getViewAppUserList = () =>
  apiInceptor.get(`/api/master/viewAllAppUser`);

export const getUpdateAppUser = (inputData) =>
  apiInceptor.put(
    `/api/master/updateAppUser`, inputData
  );

export const getdeleteAppUser = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteAppUser`,
    {
      data: inputData,
      
    }
  );




export const getViewDeviesList = () =>
  apiInceptor.get(`/api/master/ViewDevicesList`);


export const UpdateViewDevices = (inputData) =>
  apiInceptor.put(
    `/api/master/updateViewDevices `, inputData
  );

export const deleteViewDevices = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteViewDevices `,
    {
      data: inputData,      
    }
  );


//---- Customer Master
export const AddCustomer = (inputData) =>
  apiInceptor.post(
    `/api/master/addCustomerMaster`, inputData
  );

export const getCustomerList = () =>
  apiInceptor.get(`/api/master/viewCustomerMaster `);

export const getUpdateCustomer = (inputData) =>
  apiInceptor.put(
    `/api/master/updateCustomer`, inputData
  );

export const deleteCustomer = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteCustomer`,
    {
      data: inputData,
     
    }
  );


//---- Branch Master
export const AddBranch = (inputData) =>
  apiInceptor.post(
    `/api/master/addBranch`, inputData
  );

export const getBranchList = () =>
  apiInceptor.get(`/api/master/viewBranch `);

export const getUpdateBranch = (inputData) =>
  apiInceptor.put(
    `/api/master/editBranch`, inputData
  );

export const deleteBranch = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteBranch`,
    {
      data: inputData,
      
    }
  );


//---- Group Master
export const AddGroupMaster = (inputData) =>
  apiInceptor.post(
    `/api/master/addGroup`, inputData
  );

export const getGroupMasterList = () =>
  apiInceptor.get(`/api/master/viewGroup `);

export const getUpdateGroupMaster = (inputData) =>
  apiInceptor.put(
    `/api/master/editGroup`, inputData
  );

export const deleteGroupMaster = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteGroup`,
    {
      data: inputData,
      
    }
  );

//---- Server Master
export const AddServerMaster = (inputData) =>
  apiInceptor.post(
    `/api/master/addServer`, inputData
  );

export const getServerMasterList = () =>
  apiInceptor.get(`/api/master/viewAllServer `);

export const getUpdateServerMaster = (inputData) =>
  apiInceptor.put(
    `/api/master/editServer`, inputData
  );

export const deleteServerMaster = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteServer`,
    { data: inputData,    }
  );


//---- OEM Master
export const AddOEMMaster = (inputData) =>
  apiInceptor.post(
    `/api/master/addVendor`, inputData
  );

export const getOEMMasterList = () =>
  apiInceptor.get(`/api/master/viewAllVendor `);

export const getUpdateOEMMaster = (inputData) =>
  apiInceptor.put(
    `/api/master/updateVendor`, inputData
  );

export const deleteOEMMaster = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteVendor`,
    {
      data: inputData,
      
    }
  );

export const uploadContentDistribution = (formData) =>
  apiInceptor.post(
    `/api/upload/contentDistribution`,
    formData
  );

export const getDownloadingPatchProgress = () =>
  apiInceptor.get(`/api/upload/viewDownloadingPatchProgress`);

export const addSetServerPolicy = (inputData) =>
  apiInceptor.post(
    `/api/master/addServerPolicy`, inputData
  );


export const viewAllServerPolicy = () =>
  apiInceptor.get(`/api/master/viewAllServerPolicy`);



export const editSetServerPolicy = (inputData) =>
  apiInceptor.put(
    `/api/master/updateServerPolicy`, inputData
  );


export const deleteSelectedPolicyServer = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteServerPolicy`,
    {
      data: inputData,     
    }
  );

export const addMailConfig = (inputData) =>
  apiInceptor.post(
    `/api/master/addMailConfig`, inputData
  );


export const viewAllMailConfig = () =>
  apiInceptor.get(`/api/master/viewMailConfig`);

export const editMailConfig = (inputData) =>
  apiInceptor.put(
    `/api/master/updateMailConfig`, inputData
  );


export const deleteSelectMailConfig = (inputData) =>
  apiInceptor.delete(
    `/api/master/deleteMailConfig`,
    {
      data: inputData,
      
    }
  );


export const addPeriodicReport = (inputData) =>
  apiInceptor.post(
    `/api/master/addPeriodicReport`, inputData
  );


export const viewAllPeriodicReportList = () =>
  apiInceptor.get(`/api/master/viewAllPeriodicReport`);

export const editPeriodicReport = (inputData) =>
  apiInceptor.put(
    `/api/master/updatePeriodicReport`, inputData
  );



export const deleteSelectPeriodicReport = (inputData) =>
  apiInceptor.delete(
    `/api/master/deletePeriodicReport`,
    {
      data: inputData,
      
    }
  );

// ================= SCHEDULE MULTIPLE RUN COMAND ===========

export const AddActivityScheduler = (inputData) =>
  apiInceptor.post(
    `/api/RunCommand/AddcmdScheduler`, inputData
  );

export const getActivitySchedulerList = () =>
  apiInceptor.get(`/api/RunCommand/listcmdScheduler `);

export const getUpdateActivityScheduler = (inputData) =>
  apiInceptor.put(
    `/api/RunCommand/updatecmdScheduler`, inputData
  );

export const deleteActivityScheduler = (inputData) =>
  apiInceptor.delete(
    `/api/RunCommand/deletecmdScheduler`,
    {
      data: inputData,
      
    }
  );

export const getUpdateStatusActivityScheduler = (inputData) =>
  apiInceptor.put(
    `/api/RunCommand/UpdatestatuscmdScheduler`, inputData
  );

// sumit changes  

// ================================= AUTO APPROVAL RULE PATCH SETTING ================================// 
export const AddAutoApprovalRule = async (inputData) => {
  return await apiInceptor.post(
    `/api/view-approval-rule/addApprovalRule`,
    inputData
  );
};


export const getAutoApprovalRule = async () => {
  return await apiInceptor.get(
    `/api/view-approval-rule/viewAllApprovalRule`,

  );
};


export const enableViewApprovalRule = (inputData) =>
  apiInceptor.put(
    `/api/view-approval-rule/enableApprovalRule/${inputData}`,
   
  );

export const disableViewApprovalRule = (inputData) =>
  apiInceptor.put(
    `/api/view-approval-rule/disableApprovalRule/${inputData}`,   
  );

export const getAutoApprovalRuleById = async (InputData) => {
  return await apiInceptor.get(
    `/api/view-approval-rule/viewSingleApprovalRule/${InputData}`,

  );
};


export const UpdateAutoApprovalRule = (inputData, id) =>
  apiInceptor.put(
    `/api/view-approval-rule/updateApprovalRule/${id}`, inputData
  );

export const deleteAutoApprovalRule = (inputData, id) =>
  apiInceptor.delete(
    `/api/view-approval-rule/deleteApprovalRule/${id}`,    
  );




export const windowsOverallComplaince = () =>
  apiInceptor.get(`/api/dashboard/overallComplainceData`);

export const windowsComplainceDataDashboard = () =>
  apiInceptor.get(`/api/dashboard/complainceDataDashboard`);

// ================================= Products And Classification ================================// 

export const getProductsListing = () =>
  apiInceptor.get(`/api/products-classification/products`);

export const getClassificationsListing = () =>
  apiInceptor.get(`/api/products-classification/classifications`);

export const updateProductClass = (inputData) =>
  apiInceptor.put(
    `/api/products-classification/updateProductClass`, inputData
  );

export const getselectedProductsList = () =>
  apiInceptor.get(`/api/products-classification/selected-products`);

export const getselectedClassificationsList = () =>
  apiInceptor.get(`/api/products-classification/selected-classifications`);

  export const DiscoverProducts = async () => {
  return await apiInceptor.post(
    `/api/products-classification/discover-products`,
    
  );
};

  export const DiscoverClasification = async () => {
  return await apiInceptor.post(
    `/api/products-classification/discover-classifications`,
    
  );
};


export const PatchTreewsus_dashboard_statistics = () =>
  apiInceptor.get(`/api/PatchTree/wsus-dashboard-statistics`);


// ================================= UPDATE SYNC SCHEDULE ================================// 

export const AddUpdatesSyncSchedule = async (inputData) => {
  return await apiInceptor.post(
    `/api/updates-sync-schedule/saveUpdateSyncSchedule`,
    inputData
  );
};


export const getUpdatesSyncScheduleList = () =>
  apiInceptor.get(`/api/updates-sync-schedule/listUpdatesSyncSchedule`);


// ================================= View Synchronization Policy ================================// 


export const getAllViewSyncPolicy = () =>
  apiInceptor.get(`/api/client-sync/listViewSyncPolicy`);


export const deleteViewSyncPolicy = (inputData, id) =>
  apiInceptor.delete(
    `/api/client-sync/deleteViewSyncPolicy/${id}`,
    {
      data: inputData,
     
    }
  );

  export const RunPolicyRule = async (inputData) => {
  return await apiInceptor.post(
    `/api/client-sync/run-policy`,
    inputData
  );
};



// ================================= Client Wise Synchronization Policy ================================// 

export const AddClientWiseSyncPolicy = async (inputData) => {
  return await apiInceptor.post(
    `/api/client-sync/saveClientWiseSyncPolicy`,
    inputData
  );
};

// ================================= View Client Wise Synchronization Policy ================================// 

export const getAllViewClientWiseSyncPolicy = () =>
  apiInceptor.get(`/api/client-sync/listViewClientWiseSyncPolicy`);

export const updateViewClientWiseSyncPolicy = (inputData) =>
  apiInceptor.put(
    `/api/client-sync/updateViewClientWiseSyncPolicy`, inputData
  );


export const deleteViewClientWiseSyncPolicy = (inputData, id) =>
  apiInceptor.delete(
    `/api/client-sync/deleteViewClientWiseSyncPolicy/${id}`,
    {
      data: inputData,
     
    }
  );


// ================================= Patch Tree ================================// 


export const getSynchronizeStatus = () =>
  apiInceptor.get(`/api/PatchTree/getSynchronizeStatus`);



export const getSyncPercent = () =>
  apiInceptor.get(`/api/PatchTree/getSyncPercent`);


export const stopSynchronisationProcess = () =>
  apiInceptor.get(`/api/PatchTree/stopSynchronisationProcess`);




export const getServerStatisticData = () =>
  apiInceptor.get(`/api/PatchTree/getServerStatisticData`);


export const getComputerStatusPie = (inputData) =>
  apiInceptor.get(`/api/PatchTree/getComputerStatusPie`, inputData
  );



export const getupdateStatus = () =>
  apiInceptor.get(`/api/PatchTree/getupdateStatus`);

export const getrecentActivity = () =>
  apiInceptor.get(`/api/PatchTree/dashboard-timeline`);


// ================================= Third Party  ================================// 

export const getThirdPartyPatchRepo = () =>
  apiInceptor.get(`/api/thirdparty/PatchRepository`);

export const getThirdPartyCompletedApps = (inputData) =>
  apiInceptor.get(`/api/thirdparty/completed-apps`, inputData
  );

export const getThirdPartyPendingApps = (inputData) =>
  apiInceptor.get(`/api/thirdparty/pending-apps`, inputData
  );

export const getThirdPartyFailedApps = (inputData) =>
  apiInceptor.get(`/api/thirdparty/failed-apps`, inputData
  );



export const getThirdPartyMissingApps = () =>
  apiInceptor.get(`/api/thirdparty/missing-apps `);




export const thirdPartyMissingApprovePatches = (inputData) =>
  apiInceptor.post(
    `/api/thirdparty/approve-missing-apps`, inputData
  );


export const getThirdPartyInstalledApps = () =>
  apiInceptor.get(`/api/thirdparty/installed-apps`);

export const getThirdPartyPatchStatus = () =>
  apiInceptor.get(`/api/thirdparty/patch-status`);


export const getThirdPartypatchprogress = () =>
  apiInceptor.get(`/api/thirdparty/patch-progress`);

export const getThirdPartyHostView = (inputData) =>
  apiInceptor.get(`/api/thirdparty/host-summary`, inputData
  );

export const getThirdPartyHostinfo = (ip) =>
  apiInceptor.get(`/api/thirdparty/host-info`, {
    params: { ip: ip }
  });

export const getThirdPartyHostappsdetails = (hostname, ip) =>
  apiInceptor.get(`/api/thirdparty/host-apps`, {
    params: {
      hostname: hostname,
      ip: ip
    }
  });

export const getThirdPartylatestSoftware = () =>
  apiInceptor.get(`/api/thirdparty/latest-software`);

// ================================= Linux  ================================// 
export const getLinuxMissingApps = () =>
  apiInceptor.get(`/api/linux/linux-missing-apps`);


export const LinuxMissingApprovePatches = (inputData) =>
  apiInceptor.post(
    `/api/linux/approve-missing-apps`, inputData
  );

// -----------------Linux Reports
export const getLinuxCompletedReport = (inputData) =>
  apiInceptor.post(
    `/api/linux-reports/linux-completed`, inputData
  );

export const getLinuxFailedReport = (inputData) =>
  apiInceptor.post(
    `/api/linux-reports/linux-failed`, inputData
  );

export const getLinuxPendingReport = (inputData) =>
  apiInceptor.post(
    `/api/linux-reports/linux-pending`, inputData
  );

export const getLinuxMissingReport = (inputData) =>
  apiInceptor.post(
    `/api/linux-reports/linux-missing`, inputData
  );

export const getLinuxPatchRepo = () =>
  apiInceptor.get(`/api/linux/LinuxRepolist`);


export const getPatchTreeMissingAppApprvDec = () =>
  apiInceptor.get(`/api/PatchTree/windowMissingPatches`);


export const getGroupData = () =>
  apiInceptor.get(`/api/PatchTree/allGroup`);


export const getWindowMissingPatchApprove = (inputData) =>
  apiInceptor.post(
    `/api/PatchTree/approve-decline`, inputData
  );


export const getPatchTreeTotalPatchesData = (inputData) =>
  apiInceptor.get(`/api/PatchTree/TotalPatchList`);


export const getSidebarServerData = () =>
  apiInceptor.get(`/api/PatchTree/getSidebarServer`);


export const getPatchTreePatcheStatusData = (inputData) =>
  apiInceptor.get(`/api/PatchTree/PatchStatusList`, inputData
  );


export const getPatchTreeUnapprovedPatchList = (inputData) =>
  apiInceptor.get(`/api/PatchTree/unapprovedPatchList`);

export const getSidebarGroupsData = () =>
  apiInceptor.get(`/api/PatchTree/getSidebarGroups`);

export const getAllUpdateData = () =>
  apiInceptor.get(`/api/PatchTree/getAllUpdates`);

export const getClasssifiedUpdatesData = (data) =>
  apiInceptor.post(`/api/PatchTree/getClassification`,
    data);

export const getpatchDetailsData = (data) =>
  apiInceptor.post(`/api/PatchTree/getPatchDetails`,
    data);


export const getPatchgraphPieData = (data) =>
  apiInceptor.post(`/api/PatchTree/getPatchgraphPie`,
    data);



export const getPatchgraphClickData = (data) =>
  apiInceptor.post(`/api/PatchTree/getPatchgraphClick`,
    data);

export const getPatchgroupDetailsData = (data) =>
  apiInceptor.post(`/api/PatchTree/getPatchgroupDetails`,
    data);

export const getGroupDataList = (data) =>
  apiInceptor.post(`/api/PatchTree/getGroupDataList`,
    data);

export const getgrpComputerDetails = (name) =>
  apiInceptor.get(`/api/PatchTree/Computerdetails`, {
    params: {
      name: name
    }
  });


export const getComputerPiechart = (name) =>
  apiInceptor.get(`/api/PatchTree/ComputerPiechart`, {
    params: {
      computerName: name
    }
  });

export const getComputerPieonclick = (name, status) =>
  apiInceptor.get(`/api/PatchTree/ComputerPieonclick`, {
    params: {
      computerName: name,
      status: status
    }
  });

export const getgrpComputerpolicy = (name) =>
  apiInceptor.get(`/api/PatchTree/Computerpolicy`, {
    params: {
      name: name
    }
  });

export const getsyncHistoryData = () =>
  apiInceptor.get(`/api/PatchTree/getSynchronizeList`);

  export const DiscoverSync = () =>
  apiInceptor.get(`/api/PatchTree/discoverSync`, );

export const getPatchTreeapprovedPatchList = (inputData) =>
  apiInceptor.get(`/api/PatchTree/approvedPatchList`);


export const getDiscoverGroup = (servername) =>
  apiInceptor.get(`/api/PatchTreeClick/discoverGroup`, {
    params: {
      UDstream: servername
    }
  });

export const getDiscoverComputers = (servername) =>
  apiInceptor.get(`/api/PatchTreeClick/discoverComputers`, {
    params: {
      UDstream: servername
    }
  });

export const getaddGroup = (groupname) =>
  apiInceptor.get(`/api/PatchTreeClick/addGroup`, {
    params: {
      addGroup: groupname
    }
  });

export const editGroupDetails = (data) =>
  apiInceptor.post(`/api/PatchTreeClick/editGroup`,
    data);

export const getPatchTreeDeclinedPatchList = (inputData) =>
  apiInceptor.get(`/api/PatchTree/declinedPatchList`);
export const deleteGroupDetails = (groupName) =>
  apiInceptor.post(`/api/PatchTreeClick/deleteGroup`, {}, {
    params: {
      groupName: groupName
    }
  });

export const addComputersDetails = (data) =>
  apiInceptor.post(`/api/PatchTreeClick/addComputerGroup`,
    data);


export const getdeleteComputerdetails = (inputData) =>
  apiInceptor.delete(
    `/api/PatchTreeClick/deleteSelectedComputers`,
    {
      data: inputData,
     
    }
  );


// ------------------ DROPDOWN API ------------------------


export const getAllBranchList = () =>
  apiInceptor.get(`/api/dropdown/BranchDropdown`);


export const getBranchWiseIpaddressList = (inputData) =>
  apiInceptor.post(
    `/api/dropdown/IpAddressDropdown`, inputData
  );

export const getOSTypedropdown = () =>
  apiInceptor.get(`/api/dropdown/getOSNames`);


export const getOSComputerdropdown = (data) =>
  apiInceptor.post(`/api/dropdown/allPCComputer`,
    data);

export const getComputerdropdowm = (servername) =>
  apiInceptor.get(`/api/dropdown/allPCComputerServer`, {
    params: {
      sernm: servername
    }
  });

export const getGrouplistdropdown = () =>
  apiInceptor.get(`/api/dropdown/getgrouplist`, );

export const getIpListdropdown = () =>
  apiInceptor.get(`/api/dropdown/getIpAddresslist`, );

export const getClassifficationdropdown = () =>
  apiInceptor.get(`/api/dropdown/classificationDropdown`, );


export const getproductdropdown = () =>
  apiInceptor.get(`/api/dropdown/productDropdown`, );

export const getMasterVendorNamedropdown = () =>
  apiInceptor.get(`/api/dropdown/getvendorlist`, );

export const getMasterCustomerNamedropdown = () =>
  apiInceptor.get(`/api/dropdown/getcustomerlist`,);

export const getMasterbranchNamedropdown = () =>
  apiInceptor.get(`/api/dropdown/getbranchlist`, );

export const getMasterCommanddropdown = () =>
  apiInceptor.get(`/api/dropdown/getcommandlist`, );

export const getWindowsPatchdropdown = () =>
  apiInceptor.get(`/api/dropdown/getpatchlist`, );


export const getPatchedEndpointList = () =>
  apiInceptor.get(`/api/dashboard/PatchedEndpointList`, );

  export const getNonComplaintEndpointList = () =>
  apiInceptor.get(`/api/dashboard/NonComplaintEndpointList`, );

    export const getFailedEndpointList = () =>
  apiInceptor.get(`/api/dashboard/FailedEndpointList`, );

  
    export const getOfflineEndpointList = () =>
  apiInceptor.get(`/api/dashboard/OfflineEndpointList`);


  export const getOsPatchStatusListAllModal = () =>
apiInceptor.get(`/api/dashboard/OsPatchStatusListAllModal`);


export const getTopRiskDevicesList = () => 
apiInceptor.get(`/api/dashboard/TopRiskDevicesList`);

export const getVulnerabilityModalList = () => 
apiInceptor.get(`/api/dashboard/thirdpartyseverityModalList`);






// {
//   "title": "2025-12 Cumulative Update for Windows 11, version 25H2 for x64-based Systems (KB5072033) (26200.7462)"
// }


// http://localhost:8081/api/PatchTree/getClassification

// http://localhost:8081/api/PatchTree/getPatchDetails

// http://localhost:8081/api/PatchTree/getPatchgroupDetails

// http://localhost:8081/api/PatchTree/getPatchgraphPie  & getPatchgraphClick




// // Side bar
// http://localhost:8081/api/PatchTree/getSidebarServer


// http://localhost:8081/api/PatchTree/getSidebarGroups
