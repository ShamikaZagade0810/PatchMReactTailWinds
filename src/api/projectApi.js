import axios from "axios";


//const getToken() = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3ODE1MDY4MDQsImV4cCI6MTc4MTU5MzIwNH0.9sTTgcQN78QWSubxZE5krXbssCLKysm_ohjkQsv5mao';
 const Token11 = null;
const getToken = () =>{
   const Token = localStorage.getItem("accessToken");
   if(Token != null){
         return Token;
   }
}


const BASE_URL = "http://192.168.0.52:8081";

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
  const token = localStorage.getItem("accessToken");
  return axios.post(
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
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getOSCount = () =>
  axios.get(`${BASE_URL}/dashboard/getOScount`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getSecurityPostureData = () =>
  axios.get(`${BASE_URL}/dashboard/securityPosture`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getThirdPartySeverity = () =>
  axios.get(`${BASE_URL}/dashboard/thirdpartyseverity`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
export const getThirdPartyApplisting = () =>
  axios.get(`${BASE_URL}/dashboard/thirdpartyseveritylist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
export const getHistBarChart = () =>
  axios.get(`${BASE_URL}/dashboard/PatchHistoryBar`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getIpWiseStatusData = () =>
  axios.get(`${BASE_URL}/dashboard/IPPatchStatusBar`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getOsUpdatesPie = () =>
  axios.get(`${BASE_URL}/dashboard/OsPatchStatus`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getOsUpdatesList = () =>
  axios.get(`${BASE_URL}/dashboard/OsPatchStatusList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getTopRiskyDevices = () =>
  axios.get(`${BASE_URL}/dashboard/TopRiskDevices`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getApprovedCriticalList = () =>
  axios.get(`${BASE_URL}/dashboard/ApprvCriticalList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getCriticalPatchesList = () =>
  axios.get(`${BASE_URL}/dashboard/MissingCriticalList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getCriticalInstalledPatchesList = () =>
  axios.get(`${BASE_URL}/dashboard/ApprvCriticalList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });





export const getApprovedPatchesList = () =>
  axios.get(`${BASE_URL}/dashboard/ApprovedPatchList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getFailedIpList = () =>
  axios.get(`${BASE_URL}/dashboard/FailedList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getTotalPatchList = () =>
  axios.get(`${BASE_URL}/dashboard/TotalPatchList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getMissingPatchList = () =>
  axios.get(`${BASE_URL}/dashboard/MissingPatchList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });



export const getWindowList = () =>
  axios.get(`${BASE_URL}/dashboard/WindowsList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getServerList = () =>
  axios.get(`${BASE_URL}/dashboard/ServerList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getLinuxList = () =>
  axios.get(`${BASE_URL}/dashboard/LinuxList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getMacList = () =>
  axios.get(`${BASE_URL}/dashboard/MacList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getIpWisePatchList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/IPPatchStatusBarList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getOSWisePatchList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/OsPatchStatusAllList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getthirdPartySeverityPatchList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/thirdpartyseverityAllList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getPatchHistoryList = (inputData) =>
  axios.get(`${BASE_URL}/dashboard/PatchHistoryList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getDeviceList = () =>
  axios.get(`${BASE_URL}/devices/DevicesList
`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getPatchSeverityCount = (inputData) =>
  axios.get(`${BASE_URL}/devices/PatchSeverityCount`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getPatchInstalledCount = (inputData) =>
  axios.get(`${BASE_URL}/devices/PatchInstalledCount`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getBasicInfo = (inputData) =>
  axios.get(`${BASE_URL}/devices/BasicInfo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getHardwareInfo = (inputData) =>
  axios.get(`${BASE_URL}/devices/HardwareInfo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getComputerInfo = (inputData) =>
  axios.get(`${BASE_URL}/devices/ComputerInfo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getRamGraph = (inputData) =>
  axios.get(`${BASE_URL}/devices/RAMGraphInfo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getInstalledProgram = (inputData) =>
  axios.get(`${BASE_URL}/devices/InstallProgram`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getInstalledPatches = (inputData) =>
  axios.get(`${BASE_URL}/devices/InstallPatch`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getLinuxDashboardCount = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxDashboardCount`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getLinuxPatchStatus = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxPatchStatus`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getLinuxBranchWiseDevices = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxBranchWiseDevices`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getLinuxDeviceWiseInstallOrNeededCount = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxDeviceWiseInstallOrNeededCount`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getPatchActivityOvertime = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/PatchActivityOvertime`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getLinuxInstalledPatchList = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxInstalledPatchList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getLinuxRiskyEndpoint = () =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxRiskyDevicesList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });



export const getLinuxModalEndpointData = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxModalEndpointData`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });



export const getLinuxModalPatchData = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxModalPatchData`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getLinuxBranchwiseModal = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxBranchwiseModal`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getLinuxIpwiseModal = (inputData) =>
  axios.get(`${BASE_URL}/LinuxDashbord/LinuxIpwisewiseModal`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });



export const getPatchReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GeneratePatchReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getmissingPatchReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateMissingReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const getDeviceWiseReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateDevicewiseReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getYearMonthReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateYearMonthReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getAllStatusReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateAllStatusReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getUpdateTimelineReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GeneratePatchTimelineReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getdeviceAgentReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateDeviceAgentReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getFailedUpdateReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateFailedUpdateReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getCategoryWiseReport = (inputData) =>
  axios.post(
    `${BASE_URL}/reports/GenerateCategorywiseReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getThirdPartyPatchCount = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/PatchCount`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const getThirdPartyMonthlyPatchLine = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/MonthlyPatchLine`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getThirdPartyAppPatchStatusBar = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/AppPatchStatusBar`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getThirdPartyIPPatchStatusChart = (inputData) =>
  axios.get(
    `${BASE_URL}/thirdpartyDash/IPPatchStatusChart`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getThirdPartyTopRiskyDevices = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/TopRiskyDevices`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getRequiredSeverityBar = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/RequiredSeverityBar`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });



export const getThirdPatchCountListing = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdpartyDash/PatchCountListing`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const getThirdTotAppsListing = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/TotalAppsListing`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getThirdUpToDateAppsListing = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/UptoDateAppsListing`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getThirdOutDatedAppsListing = () =>
  axios.get(`${BASE_URL}/thirdpartyDash/OutDatedAppsListing`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getThirdMonthltPatchList = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdpartyDash/MonthltPatchList`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const getThirdAppWisePatchList = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdpartyDash/AppWisePatchList`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const requestToServerForRemoteAction = (inputData) =>
  axios.post(
    `${BASE_URL}/RemoteAction/ReqToServer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const requestIdForRemoteAction = (inputData) =>
  axios.post(
    `${BASE_URL}/RemoteAction/SelectedRequestIDList`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );



export const AddActivityCmd = (inputData) =>
  axios.post(
    `${BASE_URL}/RunCommand/addcmdactivity`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getActivityCmdList = () =>
  axios.get(`${BASE_URL}/RunCommand/ActivityCmdlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getUpdateActivityCmd = (inputData) =>
  axios.put(
    `${BASE_URL}/RunCommand/updateActivityCmd`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getdeleteActivityCmd = (inputData) =>
  axios.delete(
    `${BASE_URL}/RunCommand/deleteActivityCmd`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const sendMultiplePatches = (inputData) =>
  axios.post(
    `${BASE_URL}/patch/start`,
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
// axios.post(
//   `${BASE_URL}/master/ViewDevicesList  `,
//   inputData,
//   {
//     headers: {
//       Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getViewAppUserList = () =>
  axios.get(`${BASE_URL}/master/viewAllAppUser`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateAppUser = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateAppUser`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getdeleteAppUser = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteAppUser`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );




export const getViewDeviesList = () =>
  axios.get(`${BASE_URL}/master/ViewDevicesList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const UpdateViewDevices = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateViewDevices `,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteViewDevices = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteViewDevices `,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getCustomerList = () =>
  axios.get(`${BASE_URL}/master/viewCustomerMaster `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateCustomer = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateCustomer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteCustomer = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteCustomer`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getBranchList = () =>
  axios.get(`${BASE_URL}/master/viewBranch `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateBranch = (inputData) =>
  axios.put(
    `${BASE_URL}/master/editBranch`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteBranch = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteBranch`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getGroupMasterList = () =>
  axios.get(`${BASE_URL}/master/viewGroup `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateGroupMaster = (inputData) =>
  axios.put(
    `${BASE_URL}/master/editGroup`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteGroupMaster = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteGroup`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getServerMasterList = () =>
  axios.get(`${BASE_URL}/master/viewAllServer `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateServerMaster = (inputData) =>
  axios.put(
    `${BASE_URL}/master/editServer`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteServerMaster = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteServer`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getOEMMasterList = () =>
  axios.get(`${BASE_URL}/master/viewAllVendor `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateOEMMaster = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateVendor`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteOEMMaster = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteVendor`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );



export const getDownloadingPatchProgress = () =>
  axios.get(`${BASE_URL}/upload/viewDownloadingPatchProgress`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const addSetServerPolicy = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addServerPolicy`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const viewAllServerPolicy = () =>
  axios.get(`${BASE_URL}/master/viewAllServerPolicy`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });



export const editSetServerPolicy = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateServerPolicy`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const deleteSelectedPolicyServer = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteServerPolicy`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const addMailConfig = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addMailConfig`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const viewAllMailConfig = () =>
  axios.get(`${BASE_URL}/master/viewMailConfig`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const editMailConfig = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updateMailConfig`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const deleteSelectMailConfig = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deleteMailConfig`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const addPeriodicReport = (inputData) =>
  axios.post(
    `${BASE_URL}/master/addPeriodicReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const viewAllPeriodicReportList = () =>
  axios.get(`${BASE_URL}/master/viewAllPeriodicReport`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const editPeriodicReport = (inputData) =>
  axios.put(
    `${BASE_URL}/master/updatePeriodicReport`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const deleteSelectPeriodicReport = (inputData) =>
  axios.delete(
    `${BASE_URL}/master/deletePeriodicReport`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getActivitySchedulerList = () =>
  axios.get(`${BASE_URL}/RunCommand/listcmdScheduler `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUpdateActivityScheduler = (inputData) =>
  axios.put(
    `${BASE_URL}/RunCommand/updatecmdScheduler`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteActivityScheduler = (inputData) =>
  axios.delete(
    `${BASE_URL}/RunCommand/deletecmdScheduler`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getUpdateStatusActivityScheduler = (inputData) =>
  axios.put(
    `${BASE_URL}/RunCommand/UpdatestatuscmdScheduler`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

// sumit changes  

// ================================= AUTO APPROVAL RULE PATCH SETTING ================================// 
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const disableViewApprovalRule = (inputData) =>
  axios.put(
    `${BASE_URL}/view-approval-rule/disableApprovalRule/${inputData}`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`
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
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const deleteAutoApprovalRule = (inputData, id) =>
  axios.delete(
    `${BASE_URL}/view-approval-rule/deleteApprovalRule/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );




export const windowsOverallComplaince = () =>
  axios.get(`${BASE_URL}/dashboard/overallComplainceData`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const windowsComplainceDataDashboard = () =>
  axios.get(`${BASE_URL}/dashboard/complainceDataDashboard`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

// ================================= Products And Classification ================================// 

export const getProductsListing = () =>
  axios.get(`${BASE_URL}/products-classification/products`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getClassificationsListing = () =>
  axios.get(`${BASE_URL}/products-classification/classifications`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const updateProductClass = (inputData) =>
  axios.put(
    `${BASE_URL}/products-classification/updateProductClass`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getselectedProductsList = () =>
  axios.get(`${BASE_URL}/products-classification/selected-products`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getselectedClassificationsList = () =>
  axios.get(`${BASE_URL}/products-classification/selected-classifications`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const PatchTreewsus_dashboard_statistics = () =>
  axios.get(`${BASE_URL}/PatchTree/wsus-dashboard-statistics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


// ================================= UPDATE SYNC SCHEDULE ================================// 

export const AddUpdatesSyncSchedule = async (inputData) => {
  return await axios.post(
    `${BASE_URL}/updates-sync-schedule/saveUpdateSyncSchedule`,
    inputData
  );
};


export const getUpdatesSyncScheduleList = () =>
  axios.get(`${BASE_URL}/updates-sync-schedule/listUpdatesSyncSchedule`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


// ================================= View Synchronization Policy ================================// 


export const getAllViewSyncPolicy = () =>
  axios.get(`${BASE_URL}/client-sync/listViewSyncPolicy`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const deleteViewSyncPolicy = (inputData, id) =>
  axios.delete(
    `${BASE_URL}/client-sync/deleteViewSyncPolicy/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  export const RunPolicyRule = async (inputData) => {
  return await axios.post(
    `${BASE_URL}/client-sync/run-policy`,
    inputData
  );
};



// ================================= Client Wise Synchronization Policy ================================// 

export const AddClientWiseSyncPolicy = async (inputData) => {
  return await axios.post(
    `${BASE_URL}/client-sync/saveClientWiseSyncPolicy`,
    inputData
  );
};

// ================================= View Client Wise Synchronization Policy ================================// 

export const getAllViewClientWiseSyncPolicy = () =>
  axios.get(`${BASE_URL}/client-sync/listViewClientWiseSyncPolicy`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const updateViewClientWiseSyncPolicy = (inputData) =>
  axios.put(
    `${BASE_URL}/client-sync/updateViewClientWiseSyncPolicy`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const deleteViewClientWiseSyncPolicy = (inputData, id) =>
  axios.delete(
    `${BASE_URL}/client-sync/deleteViewClientWiseSyncPolicy/${id}`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


// ================================= Patch Tree ================================// 


export const getSynchronizeStatus = () =>
  axios.get(`${BASE_URL}/PatchTree/getSynchronizeStatus`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });



export const getSyncPercent = () =>
  axios.get(`${BASE_URL}/PatchTree/getSyncPercent`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const stopSynchronisationProcess = () =>
  axios.get(`${BASE_URL}/PatchTree/stopSynchronisationProcess`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });




export const getServerStatisticData = () =>
  axios.get(`${BASE_URL}/PatchTree/getServerStatisticData`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getComputerStatusPie = (inputData) =>
  axios.get(`${BASE_URL}/PatchTree/getComputerStatusPie`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });



export const getupdateStatus = () =>
  axios.get(`${BASE_URL}/PatchTree/getupdateStatus`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getrecentActivity = () =>
  axios.get(`${BASE_URL}/PatchTree/dashboard-timeline`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


// ================================= Third Party  ================================// 

export const getThirdPartyPatchRepo = () =>
  axios.get(`${BASE_URL}/thirdparty/PatchRepository`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getThirdPartyCompletedApps = (inputData) =>
  axios.get(`${BASE_URL}/thirdparty/completed-apps`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getThirdPartyPendingApps = (inputData) =>
  axios.get(`${BASE_URL}/thirdparty/pending-apps`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getThirdPartyFailedApps = (inputData) =>
  axios.get(`${BASE_URL}/thirdparty/failed-apps`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });



export const getThirdPartyMissingApps = () =>
  axios.get(`${BASE_URL}/thirdparty/missing-apps `, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });




export const thirdPartyMissingApprovePatches = (inputData) =>
  axios.post(
    `${BASE_URL}/thirdparty/approve-missing-apps`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const getThirdPartyInstalledApps = () =>
  axios.get(`${BASE_URL}/thirdparty/installed-apps`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getThirdPartyPatchStatus = () =>
  axios.get(`${BASE_URL}/thirdparty/patch-status`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getThirdPartypatchprogress = () =>
  axios.get(`${BASE_URL}/thirdparty/patch-progress`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

export const getThirdPartyHostView = (inputData) =>
  axios.get(`${BASE_URL}/thirdparty/host-summary`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });

export const getThirdPartyHostinfo = (ip) =>
  axios.get(`${BASE_URL}/thirdparty/host-info`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: { ip: ip }
  });

export const getThirdPartyHostappsdetails = (hostname, ip) =>
  axios.get(`${BASE_URL}/thirdparty/host-apps`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      hostname: hostname,
      ip: ip
    }
  });

export const getThirdPartylatestSoftware = () =>
  axios.get(`${BASE_URL}/thirdparty/latest-software`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });

// ================================= Linux  ================================// 
export const getLinuxMissingApps = () =>
  axios.get(`${BASE_URL}/linux/linux-missing-apps`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const LinuxMissingApprovePatches = (inputData) =>
  axios.post(
    `${BASE_URL}/linux/approve-missing-apps`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

// -----------------Linux Reports
export const getLinuxCompletedReport = (inputData) =>
  axios.post(
    `${BASE_URL}/linux-reports/linux-completed`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getLinuxFailedReport = (inputData) =>
  axios.post(
    `${BASE_URL}/linux-reports/linux-failed`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getLinuxPendingReport = (inputData) =>
  axios.post(
    `${BASE_URL}/linux-reports/linux-pending`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getLinuxMissingReport = (inputData) =>
  axios.post(
    `${BASE_URL}/linux-reports/linux-missing`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getLinuxPatchRepo = () =>
  axios.get(`${BASE_URL}/linux/LinuxRepolist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getPatchTreeMissingAppApprvDec = () =>
  axios.get(`${BASE_URL}/PatchTree/windowMissingPatches`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getGroupData = () =>
  axios.get(`${BASE_URL}/PatchTree/allGroup`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getWindowMissingPatchApprove = (inputData) =>
  axios.post(
    `${BASE_URL}/PatchTree/approve-decline`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


export const getPatchTreeTotalPatchesData = (inputData) =>
  axios.get(`${BASE_URL}/PatchTree/TotalPatchList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getSidebarServerData = () =>
  axios.get(`${BASE_URL}/PatchTree/getSidebarServer`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getPatchTreePatcheStatusData = (inputData) =>
  axios.get(`${BASE_URL}/PatchTree/PatchStatusList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: inputData
  });


export const getPatchTreeUnapprovedPatchList = (inputData) =>
  axios.get(`${BASE_URL}/PatchTree/unapprovedPatchList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getSidebarGroupsData = () =>
  axios.get(`${BASE_URL}/PatchTree/getSidebarGroups`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getAllUpdateData = () =>
  axios.get(`${BASE_URL}/PatchTree/getAllUpdates`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getClasssifiedUpdatesData = (data) =>
  axios.post(`${BASE_URL}/PatchTree/getClassification`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getpatchDetailsData = (data) =>
  axios.post(`${BASE_URL}/PatchTree/getPatchDetails`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getPatchgraphPieData = (data) =>
  axios.post(`${BASE_URL}/PatchTree/getPatchgraphPie`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });



export const getPatchgraphClickData = (data) =>
  axios.post(`${BASE_URL}/PatchTree/getPatchgraphClick`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getPatchgroupDetailsData = (data) =>
  axios.post(`${BASE_URL}/PatchTree/getPatchgroupDetails`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getGroupDataList = (data) =>
  axios.post(`${BASE_URL}/PatchTree/getGroupDataList`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getgrpComputerDetails = (name) =>
  axios.get(`${BASE_URL}/PatchTree/Computerdetails`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      name: name
    }
  });


export const getComputerPiechart = (name) =>
  axios.get(`${BASE_URL}/PatchTree/ComputerPiechart`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      computerName: name
    }
  });

export const getComputerPieonclick = (name, status) =>
  axios.get(`${BASE_URL}/PatchTree/ComputerPieonclick`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      computerName: name,
      status: status
    }
  });

export const getgrpComputerpolicy = (name) =>
  axios.get(`${BASE_URL}/PatchTree/Computerpolicy`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      name: name
    }
  });

export const getsyncHistoryData = () =>
  axios.get(`${BASE_URL}/PatchTree/getSynchronizeList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getPatchTreeapprovedPatchList = (inputData) =>
  axios.get(`${BASE_URL}/PatchTree/approvedPatchList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getDiscoverGroup = (servername) =>
  axios.get(`${BASE_URL}/PatchTreeClick/discoverGroup`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      UDstream: servername
    }
  });

export const getDiscoverComputers = (servername) =>
  axios.get(`${BASE_URL}/PatchTreeClick/discoverComputers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      UDstream: servername
    }
  });

export const getaddGroup = (groupname) =>
  axios.get(`${BASE_URL}/PatchTreeClick/addGroup`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      addGroup: groupname
    }
  });

export const editGroupDetails = (data) =>
  axios.post(`${BASE_URL}/PatchTreeClick/editGroup`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getPatchTreeDeclinedPatchList = (inputData) =>
  axios.get(`${BASE_URL}/PatchTree/declinedPatchList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
export const deleteGroupDetails = (groupName) =>
  axios.post(`${BASE_URL}/PatchTreeClick/deleteGroup`, {}, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      groupName: groupName
    }
  });

export const addComputersDetails = (data) =>
  axios.post(`${BASE_URL}/PatchTreeClick/addComputerGroup`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getdeleteComputerdetails = (inputData) =>
  axios.delete(
    `${BASE_URL}/PatchTreeClick/deleteSelectedComputers`,
    {
      data: inputData,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );


// ------------------ DROPDOWN API ------------------------


export const getAllBranchList = () =>
  axios.get(`${BASE_URL}/dropdown/BranchDropdown`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }

  });


export const getBranchWiseIpaddressList = (inputData) =>
  axios.post(
    `${BASE_URL}/dropdown/IpAddressDropdown`,
    inputData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

export const getOSTypedropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getOSNames`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });


export const getOSComputerdropdown = (data) =>
  axios.post(`${BASE_URL}/dropdown/allPCComputer`,
    data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getComputerdropdowm = (servername) =>
  axios.get(`${BASE_URL}/dropdown/allPCComputerServer`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      sernm: servername
    }
  });

export const getGrouplistdropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getgrouplist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getIpListdropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getIpAddresslist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getClassifficationdropdown = () =>
  axios.get(`${BASE_URL}/dropdown/classificationDropdown`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });


export const getproductdropdown = () =>
  axios.get(`${BASE_URL}/dropdown/productDropdown`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterVendorNamedropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getvendorlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterCustomerNamedropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getcustomerlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterbranchNamedropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getbranchlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getMasterCommanddropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getcommandlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

export const getWindowsPatchdropdown = () =>
  axios.get(`${BASE_URL}/dropdown/getpatchlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });


export const getPatchedEndpointList = () =>
  axios.get(`${BASE_URL}/dashboard/PatchedEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

  export const getNonComplaintEndpointList = () =>
  axios.get(`${BASE_URL}/dashboard/NonComplaintEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

    export const getFailedEndpointList = () =>
  axios.get(`${BASE_URL}/dashboard/FailedEndpointList`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });

  
    export const getOfflineEndpointList = () =>
  axios.get(`${BASE_URL}/dashboard/OfflineEndpointList`, {
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
