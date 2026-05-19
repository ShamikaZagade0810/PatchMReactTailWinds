import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3NzkxNjY5ODEsImV4cCI6MTc3OTI1MzM4MX0.Crrkr5mp2QuqZP9PrZJIIaRBVImNbcPTNTsuowXBoFM';
const BASE_URL = "http://192.168.0.54:8081";

export const getProjects = () =>
  axios.get(`${BASE_URL}/projectdetail/viewProjectPayload`);

export const getChanges = () =>
  axios.get(`${BASE_URL}/projectdetail/currentChangesDetails`);

export const createProject = (payload) =>
  axios.post(`${BASE_URL}/projectdetail/addProjectPayload`, payload);

export const getProjectEnvironments = (projectId) =>
  axios.get(`${BASE_URL}/environmentDataMaster/project/${projectId}`);

export const createEnvironment = (payload) =>
  axios.post(`${BASE_URL}/environmentDataMaster/newEnvironment`, payload);

export const createInstance = (payload) =>
  axios.post(`${BASE_URL}/dbInstance/dbInstanceCreate`, payload);

export const getInstances = () =>
  axios.get(`${BASE_URL}/dbInstance/getAllInstance`);

export const createPackage = (formData) =>
  axios.post(`${BASE_URL}/api/change-packages/createPackage`, formData);

export const getPackagesByProject = (projectId) =>
  axios.get(
    `${BASE_URL}/packageForm/getPackegeByProject?projectId=${projectId}`,
  );

export const getDriftsByProject = (projectId) =>
  axios.get(`${BASE_URL}/sanpshot/drift-report?projectId=${projectId}`);

export const getDrifts = () =>
  axios.get(`${BASE_URL}/sanpshot/getdrift-report`);

export const getAllDbInstances = () =>
  axios.get(`${BASE_URL}/dbInstance/getAllInstance`);

export const getPackageCount = () =>
  axios.get(`${BASE_URL}/packageForm/packageCount`);

export const approvePackage = (projectId, environmentId, packageId) =>
  axios.post(`${BASE_URL}/api/change-packages/approvePackege`, {
    projectId,
    envId: environmentId,
    packageId,
  });

export const getPackageData = () =>
  axios.get(`${BASE_URL}/api/change-packages/getPackageData`);

export const requestPackage = (payload) =>
  axios.post(`${BASE_URL}/api/change-packages/pendingPackege`, payload);

// NEWLY ADDED FUNCTIONS

export const testDbConnection = (payload) =>
  axios.post(`${BASE_URL}/dbInstance/test-connection`, payload);

export const createInstanceWithConnection = (payload) =>
  axios.post(`${BASE_URL}/dbInstance/createInstanceWithConnection`, payload);

export const getPackageDataByProjectId = (projectId) =>
  axios.get(
    `${BASE_URL}/api/change-packages/getPackageDataByProjectId?projectId=${projectId}`,
  );

export const getPackageExcutionByProjectId = (projectId) =>
  axios.get(
    `${BASE_URL}/packageForm/getPackageExcutionByProjectId?projectId=${projectId}`,
  );

export const getPackageWithoutAssign = (projectId) =>
  axios.get(
    `${BASE_URL}/packageForm/getPackageWithoutAssign?projectId=${projectId}`,
  );

export const createPackageFromDrift = ({ driftIds, projectId, payload }) => {
  const url = `${BASE_URL}/sanpshot/generate-drift-packages?driftIds=${driftIds.join(
    ",",
  )}&projectId=${projectId}`;

  return axios.post(url, payload);
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
  axios.post(`${BASE_URL}/sanpshot/generate-newDrift-packages`, {
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

  axios.post(`${BASE_URL}/api/change-packages/rejectPackage`, payload);
};

// Add to your existing projectApi.js
export const previewDriftScripts = async ({
  projectId,
  driftIds,
  preQuery,
  postQuery,
}) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_BASE_URL}/projects/${projectId}/drifts/preview`,
    {
      driftIds,
      preQuery,
      postQuery,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

// projectApi.js
export const previewRollbackScript = (payload) =>
  axios.post("/drifts/preview/rollback", payload);

export const previewChangeLogScript = (payload) =>
  axios.post("/drifts/preview/changelog", payload);

export const previewDriftPackage = async (payload) => {
  // const newr = {
  //   driftIds: [146],
  //   projectId: 1,
  // };

  console.log("payload in api ", payload);

  try {
    const res = await axios.post(
      `${BASE_URL}/sanpshot/preview-drift-package`,
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
  axios.get(
    `${BASE_URL}/environmentDataMaster/getInstanceByProjectType?projectId=${projectId}`,
  );

// Fetch versions for a specific schema
export const fetchVersionsForSchema = async (
  projectId,
  environmentId,
  schemaName,
) => {
  const response = await fetch(
    `${BASE_URL}/sanpshot/getVersions?projectId=${projectId}&environmentId=${environmentId}&schemaName=${schemaName}`,
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
    `${BASE_URL}/sanpshot/getSchemaTableIdByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,
  );
  if (!response.ok) throw new Error("Failed to fetch tables for version");
  const data = await response.json();
  return data.data || { tables: [], tableCount: 0 };
};

export const getAllDrivers = () =>
  axios.get(`${BASE_URL}/environmentDataMaster/getAllDriver`);

export const fetchTableCountForVersion = async (
  projectId,
  environmentId,
  versionName,
) => {
  const response = await fetch(
    `${BASE_URL}/sanpshot/getSchemaTableIdByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,
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
    const response = axios.post(
      `${BASE_URL}/api/change-packages/fromPacakgePreview`,
      data,
    );
    console.log("response at api call in project js ", response);


    return response;
  } catch (error) {
    throw error;
  }




};

export const getPatches = () =>
  axios.get(`${BASE_URL}/dashboard/dashboardCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getOSCount = () =>
  axios.get(`${BASE_URL}/dashboard/getOScount`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const getSecurityPostureData = () =>
  axios.get(`${BASE_URL}/dashboard/securityPosture`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getThirdPartySeverity = () =>
  axios.get(`${BASE_URL}/dashboard/thirdpartyseverity`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
export const getThirdPartyApplisting = () =>
  axios.get(`${BASE_URL}/dashboard/thirdpartyseveritylist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
export const getHistBarChart = () =>
  axios.get(`${BASE_URL}/dashboard/PatchHistoryBar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getIpWiseStatusData = () =>
  axios.get(`${BASE_URL}/dashboard/IPPatchStatusBar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getOsUpdatesPie = () =>
  axios.get(`${BASE_URL}/dashboard/OsPatchStatus`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getOsUpdatesList = () =>
  axios.get(`${BASE_URL}/dashboard/OsPatchStatusList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const getTopRiskyDevices = () =>
  axios.get(`${BASE_URL}/dashboard/TopRiskDevices`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const getCriticalPatchesList = () =>
  axios.get(`${BASE_URL}/dashboard/ApprvCriticalList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getApprovedPatchesList = () =>
  axios.get(`${BASE_URL}/dashboard/ApprovedPatchList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getFailedIpList = () =>
  axios.get(`${BASE_URL}/dashboard/FailedList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getTotalPatchList = () =>
  axios.get(`${BASE_URL}/dashboard/TotalPatchList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const getMissingPatchList = () =>
  axios.get(`${BASE_URL}/dashboard/MissingPatchList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });



export const getWindowList = () =>
  axios.get(`${BASE_URL}/dashboard/WindowsList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getServerList = () =>
  axios.get(`${BASE_URL}/dashboard/ServerList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getLinuxList = () =>
  axios.get(`${BASE_URL}/dashboard/LinuxList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getMacList = () =>
  axios.get(`${BASE_URL}/dashboard/MacList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const getIpWisePatchList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/IPPatchStatusBarList`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getOSWisePatchList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/OsPatchStatusAllList`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });


export const getthirdPartySeverityPatchList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/thirdpartyseverityAllList`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });


export const getPatchHistoryList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/PatchHistoryList`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getDeviceList = () =>
  axios.get(`${BASE_URL}/devices/DevicesList
`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const getPatchSeverityCount = (inputData) =>
  axios.get(`${BASE_URL}/devices/PatchSeverityCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getPatchInstalledCount = (inputData) =>
  axios.get(`${BASE_URL}/devices/PatchInstalledCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getBasicInfo = (inputData) =>
  axios.get(`${BASE_URL}/devices/BasicInfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getHardwareInfo = (inputData) =>
  axios.get(`${BASE_URL}/devices/HardwareInfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getComputerInfo = (inputData) =>
  axios.get(`${BASE_URL}/devices/ComputerInfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });


export const getRamGraph = (inputData) =>
  axios.get(`${BASE_URL}/devices/RAMGraphInfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getInstalledProgram = (inputData) =>
  axios.get(`${BASE_URL}/devices/InstallProgram`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });


export const getInstalledPatches = (inputData) =>
  axios.get(`${BASE_URL}/devices/InstallPatch`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });

export const getLinuxDashboardCount = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxDashboardCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const getLinuxPatchStatus = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxPatchStatus`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getLinuxBranchWiseDevices = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxBranchWiseDevices`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getLinuxDeviceWiseInstallOrNeededCount = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxDeviceWiseInstallOrNeededCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getPatchActivityOvertime = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/PatchActivityOvertime`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const getLinuxInstalledPatchList = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxInstalledPatchList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getLinuxRiskyEndpoint = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxRiskyDevicesList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });



export const getLinuxModalEndpointData = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxModalEndpointData`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });



export const getLinuxModalPatchData = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxModalPatchData`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });


export const getLinuxBranchwiseModal = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxBranchwiseModal`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });


export const getLinuxIpwiseModal = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxIpwisewiseModal`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: inputData
  });



export const getPatchReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GeneratePatchReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getmissingPatchReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateMissingReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const getDeviceWiseReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateDevicewiseReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getYearMonthReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateYearMonthReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getAllStatusReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateAllStatusReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getUpdateTimelineReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GeneratePatchTimelineReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getdeviceAgentReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateDeviceAgentReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getFailedUpdateReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateFailedUpdateReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getCategoryWiseReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateCategorywiseReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getThirdPartyPatchCount = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/PatchCount`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const getThirdPartyMonthlyPatchLine = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/MonthlyPatchLine`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getThirdPartyAppPatchStatusBar = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/AppPatchStatusBar`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getThirdPartyIPPatchStatusChart = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/IPPatchStatusChart`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getThirdPartyTopRiskyDevices = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/TopRiskyDevices`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getRequiredSeverityBar = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/RequiredSeverityBar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });



export const getThirdPatchCountListing = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdpartyDash/PatchCountListing`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const getThirdTotAppsListing = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/TotalAppsListing`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getThirdUpToDateAppsListing = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/UptoDateAppsListing`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const getThirdOutDatedAppsListing = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/OutDatedAppsListing`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const getThirdMonthltPatchList = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdpartyDash/MonthltPatchList`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const getThirdAppWisePatchList = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdpartyDash/AppWisePatchList`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const requestToServerForRemoteAction = (inputData) =>
  axios.post(
    `${BASE_URL}/RemoteAction/ReqToServer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const requestIdForRemoteAction = (inputData) =>
  axios.post(
    `${BASE_URL}/RemoteAction/SelectedRequestIDList`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const getAllBranchList = () =>
  axios.get(`${BASE_URL}/dropdown/BranchDropdown`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const getBranchWiseIpaddressList = (inputData) =>
  axios.post(
    `${BASE_URL}/dropdown/IpAddressDropdown`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const AddActivityCmd = (inputData) =>
  axios.post(
    `${BASE_URL}/RunCommand/addcmdactivity`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getActivityCmdList = () =>
  axios.get(`${BASE_URL}/RunCommand/ActivityCmdlist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const getUpdateActivityCmd = (inputData) =>
  axios.put(
    `${BASE_URL}/RunCommand/updateActivityCmd`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getdeleteActivityCmd = (inputData) =>
  axios.delete(
    `${BASE_URL}/RunCommand/deleteActivityCmd`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const sendMultiplePatches = (inputData) =>
  axios.post(
    `${BASE_URL}/patch/start`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );

// MASTER API's

//---- VIEW DEVICES
// export const ViewDeviesList = (inputData) =>
// axios.post(
//   `${BASE_URL}/master/ViewDevicesList  `,
//   inputData,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// );

//---- Add User
export const AddAppUser = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addNewAppUser`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getViewAppUserList = () =>
  axios.get(`${BASE_URL}/master/viewAllAppUser`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateAppUser = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateAppUser`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getdeleteAppUser = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteAppUser`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );




export const getViewDeviesList = () =>
  axios.get(`${BASE_URL}/master/ViewDevicesList`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const UpdateViewDevices = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateViewDevices `,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteViewDevices = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteViewDevices `,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


//---- Customer Master
export const AddCustomer = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addCustomerMaster`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getCustomerList = () =>
  axios.get(`${BASE_URL}/master/viewCustomerMaster `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateCustomer = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateCustomer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteCustomer = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteCustomer`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


//---- Branch Master
export const AddBranch = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addBranch`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getBranchList = () =>
  axios.get(`${BASE_URL}/master/viewBranch `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateBranch = (inputData) =>
  axios.put(
    `${BASE_URL}/master/editBranch`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteBranch = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteBranch`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


//---- Group Master
export const AddGroupMaster = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addGroup`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getGroupMasterList = () =>
  axios.get(`${BASE_URL}/master/viewGroup `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateGroupMaster = (inputData) =>
  axios.put(
    `${BASE_URL}/master/editGroup`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteGroupMaster = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteGroup`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

//---- Server Master
export const AddServerMaster = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addServer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getServerMasterList = () =>
  axios.get(`${BASE_URL}/master/viewAllServer `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateServerMaster = (inputData) =>
  axios.put(
    `${BASE_URL}/master/editServer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteServerMaster = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteServer`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


//---- OEM Master
export const AddOEMMaster = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addVendor`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getOEMMasterList = () =>
  axios.get(`${BASE_URL}/master/viewAllVendor `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateOEMMaster = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateVendor`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteOEMMaster = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteVendor`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );



export const getDownloadingPatchProgress = () =>
  axios.get(`${BASE_URL}/upload/viewDownloadingPatchProgress`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const addSetServerPolicy = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addServerPolicy`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const viewAllServerPolicy = () =>
  axios.get(`${BASE_URL}/master/viewAllServerPolicy`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });



export const editSetServerPolicy = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateServerPolicy`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const deleteSelectedPolicyServer = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteServerPolicy`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const addMailConfig = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addMailConfig`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const viewAllMailConfig = () =>
  axios.get(`${BASE_URL}/master/viewMailConfig`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const editMailConfig = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateMailConfig`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const deleteSelectMailConfig = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteMailConfig`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const addPeriodicReport = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addPeriodicReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const viewAllPeriodicReportList = () =>
  axios.get(`${BASE_URL}/master/viewAllPeriodicReport`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const editPeriodicReport = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updatePeriodicReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const deleteSelectPeriodicReport = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deletePeriodicReport`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

// ================= SCHEDULE MULTIPLE RUN COMAND ===========

export const AddActivityScheduler = (inputData) =>
  axios.post(
    `${BASE_URL}/RunCommand/AddcmdScheduler`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getActivitySchedulerList = () =>
  axios.get(`${BASE_URL}/RunCommand/listcmdScheduler `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUpdateActivityScheduler = (inputData) =>
  axios.put(
    `${BASE_URL}/RunCommand/updatecmdScheduler`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteActivityScheduler = (inputData) =>
  axios.delete(
    `${BASE_URL}/RunCommand/deletecmdScheduler`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getUpdateStatusActivityScheduler = (inputData) =>
  axios.put(
    `${BASE_URL}/RunCommand/UpdatestatuscmdScheduler`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

// sumit changes  Auto Approval Rule --> Patch Setting

export const AddAutoApprovalRule = async (inputData) => {
  return await axios.post(
    `${BASE_URL}/view-approval-rule/addApprovalRule`,
    inputData
  );
};


export const getAutoApprovalRule = async () => {
  return await axios.get(
    `${BASE_URL}/view-approval-rule/viewAllApprovalRule`,

  );
};


export const enableViewApprovalRule = (inputData) =>
  axios.put(
    `${BASE_URL}/view-approval-rule/enableApprovalRule/${inputData}`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const disableViewApprovalRule = (inputData) =>
  axios.put(
    `${BASE_URL}/view-approval-rule/disableApprovalRule/${inputData}`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const getAutoApprovalRuleById = async (InputData) => {
  return await axios.get(
    `${BASE_URL}/view-approval-rule/viewSingleApprovalRule/${InputData}`,

  );
};


export const UpdateAutoApprovalRule = (inputData, id) =>
  axios.put(
    `${BASE_URL}/view-approval-rule/updateApprovalRule/${id}`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

export const deleteAutoApprovalRule = (inputData, id) =>
  axios.delete(
    `${BASE_URL}/view-approval-rule/deleteApprovalRule/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


export const windowsOverallComplaince = () =>
  axios.get(`${BASE_URL}/dashboard/overallComplainceData`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

export const windowsComplainceDataDashboard = () =>
  axios.get(`${BASE_URL}/dashboard/complainceDataDashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const PatchTreewsus_dashboard_statistics = () =>
  axios.get(`${BASE_URL}/PatchTree/wsus-dashboard-statistics`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


export const getSynchronizeStatus = () =>
  axios.get(`${BASE_URL}/PatchTree/getSynchronizeStatus`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


  
export const getSyncPercent = () =>
  axios.get(`${BASE_URL}/PatchTree/getSyncPercent`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


    
export const getServerStatisticData = () =>
  axios.get(`${BASE_URL}/PatchTree/getServerStatisticData`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


  export const getComputerStatusPie = () =>
  axios.get(`${BASE_URL}/PatchTree/getComputerStatusPie`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });


  
  export const getupdateStatus = () =>
  axios.get(`${BASE_URL}/PatchTree/getupdateStatus`, {
    headers: {
      Authorization: `Bearer ${token}`
    }

  });

    export const getrecentActivity = () =>
  axios.get(`${BASE_URL}/PatchTree/dashboard-timeline`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

