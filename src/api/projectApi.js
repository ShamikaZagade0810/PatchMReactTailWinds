import axios from "axios";

const BASE_URL = "http://192.168.0.120:8181";

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
