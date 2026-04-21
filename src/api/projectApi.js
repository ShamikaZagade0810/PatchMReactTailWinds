import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3NzY0ODY3NjEsImV4cCI6MTc3NjU3MzE2MX0.pRNPo7PGEP4fv2QlU-h7gX4nnzjuOdjdVgTpsrEWg30';
const BASE_URL = "http://192.168.0.15:8081";

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
