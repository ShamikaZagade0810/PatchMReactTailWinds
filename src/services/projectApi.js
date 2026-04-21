import axios from "axios";

const BASE_URL = "http://192.168.0.15:8081";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const publicClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// --- Token Refresh Queue ---
// Prevents multiple simultaneous refresh attempts (race condition fix)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor: attach access token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 + token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const errorCode = error.response?.data?.errorCode;

    const isRefreshEndpoint = originalRequest.url?.includes("/refresh");

    // Only trigger refresh if token expired
    if (
      (status !== 401 && errorCode !== "TOKEN_EXPIRED") ||
      isRefreshEndpoint
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    // If already retried once, don't retry again
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // Mark as retrying and start refresh
    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      // No refresh token available — log out immediately
      isRefreshing = false;
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      // Use a plain axios call (NOT apiClient) to avoid triggering interceptors again
      const res = await axios.post(`${BASE_URL}/refresh`, { refreshToken });
      const { accessToken, refreshToken: newRefresh } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefresh);

      // Update default headers for future requests
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      processQueue(null, accessToken); // Resolve all queued requests
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null); // Reject all queued requests
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// Project APIs
export const projectApi = {
  getAllProjects: () => apiClient.get("/getAllParentProject"),

  getProjects: () => apiClient.get(`/projectdetail/viewProjectPayload`),

  getProjectOnId: (projectId) => apiClient.get(`/projectd/${projectId}`),

  getChanges: () => apiClient.get(`/projectdetail/currentChangesDetails`),

  createProject: (payload) =>
    apiClient.post(`/projectdetail/addProjectPayload`, payload),

  getProjectEnvironments: (projectId) =>
    apiClient.get(`/environmentDataMaster/project/${projectId}`),

  getDbInstancesByProjectId: (projectId) =>
    apiClient.get(
      `/environmentDataMaster/getInstanceByProjectType?projectId=${projectId}`,
    ),

  createEnvironment: (payload) =>
    apiClient.post(`/environmentDataMaster/newEnvironment`, payload),

  createInstance: (payload) =>
    apiClient.post(`/dbInstance/dbInstanceCreate`, payload),

  getInstances: () => apiClient.get(`/dbInstance/getAllInstance`),

  getAllDrivers: () => apiClient.get(`environmentDataMaster/getAllDriver`),

  createPackage: (formData) =>
    apiClient.post(`/api/change-packages/createPackage`, formData),

  savePackage: (formData) => {
    return apiClient.post(`/api/change-packages/createPackage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getPackagesByProject: (projectId) =>
    apiClient.get(`/packageForm/getPackegeByProject?projectId=${projectId}`),

  getRollbackScript: (formData) => {
    console.log("script api called", formData);

    return apiClient.post(`api/change-packages/fromPacakgePreview`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getDriftsByProject: (projectId) =>
    apiClient.get(`/sanpshot/drift-report?projectId=${projectId}`),

  getDrifts: () => apiClient.get(`/sanpshot/getdrift-report`),

  getAllDbInstances: () => apiClient.get(`/dbInstance/getAllInstance`),

  getPackageCount: () => apiClient.get(`/packageForm/packageCount`),

  approvePackage: (projectId, environmentId, packageId) =>
    apiClient.post(`/api/change-packages/approvePackege`, {
      projectId,
      envId: environmentId,
      packageId,
    }),
  rejectPackage: (payload) =>
    apiClient.post(`/api/change-packages/rejectPackage`, payload),

  getPackageData: () => apiClient.get(`/api/change-packages/getPackageData`),

  requestPackage: (payload) =>
    apiClient.post(`/api/change-packages/pendingPackege`, payload),

  testDbConnection: (payload) =>
    apiClient.post(`/dbInstance/test-connection`, payload),

  createInstanceWithConnection: (payload) =>
    apiClient.post(`/dbInstance/createInstanceWithConnection`, payload),

  getPackageDataByProjectId: (projectId) =>
    apiClient.get(
      `/api/change-packages/getPackageDataByProjectId?projectId=${projectId}`,
    ),

  getPackageExcutionByProjectId: (projectId) =>
    apiClient.get(
      `/packageForm/getPackageExcutionByProjectId?projectId=${projectId}`,
    ),

  getPackageWithoutAssign: (projectId) =>
    apiClient.get(
      `/packageForm/getPackageWithoutAssign?projectId=${projectId}`,
    ),

  createPackageFromDrift: ({ driftIds, projectId }) =>
    apiClient.post(
      `/sanpshot/generate-drift-packages?driftIds=${driftIds.join(",")}&projectId=${projectId}`,
    ),

  fetchEnvironments: (projectId) =>
    apiClient.get(`/environmentDataMaster/project/${projectId}`),

  fetchTablesForEnvironment: (projectId, environmentId) =>
    apiClient.get(
      `/sanpshot/getSchemaTableId?projectId=${projectId}&environmentId=${environmentId}`,
    ),

  fetchColumnsForTable: (projectId, environmentId, versionName) =>
    apiClient.get(
      `/sanpshot/getSchemaColumnByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,
    ),

  fetchEnvironmentSummary: (projectId) =>
    apiClient.get(
      `/environmentDataMaster/environmentSummary?projectId=${projectId}`,
    ),

  fetchTableCountForVersion: (projectId, environmentId, versionName) =>
    apiClient.get(
      // `${BASE_URL}/sanpshot/getSchemaTableIdByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,
      `/sanpshot/getVersions?projectId=${projectId}&environmentId=${environmentId}&schemaName=${versionName}`,
    ),

  fetchTablesForVersion: (projectId, environmentId, versionName) =>
    apiClient.get(
      `${BASE_URL}/sanpshot/getSchemaTableIdByVersion?projectId=${projectId}&environmentId=${environmentId}&versionName=${versionName}`,

      // http://192.168.0.120:8181/sanpshot/getVersions?projectId=1&environmentId=1&schemaName=POC_DEV_ENV
    ),
  fetchVersionsForSchema: (projectId, environmentId, versionName) =>
    apiClient.get(
      `/sanpshot/getVersions?projectId=${projectId}&environmentId=${environmentId}&schemaName=${schemaName}`,
    ),

  generateDriftPackage: ({
    projectId,
    packageName,
    description,
    rollbackScript,
    changeset,
    preExecution,
    postExecution,
  }) =>
    apiClient.post(`/sanpshot/generate-newDrift-packages`, {
      packageName,
      category: "DRIFT",
      description: description || "Drift package generated",
      scriptType: "LIQUIBASE_JSON",
      projectId,
      rollbackScript,
      changeset,
      preExecution,
      postExecution,
    }),

  previewDriftPackage: (payload) => {
    try {
      const res = apiClient.post(`/sanpshot/preview-drift-package`, payload);

      console.log("response in api:", res.data);
      return res;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },

  getPackageData: () => apiClient.get(`/api/change-packages/getPackageData`),

  getRollbackPreview: ({ projectId, version }) =>
    apiClient.get(
      `${BASE_URL}/packageForm/getRollbacksql?projectId=${projectId}&version=${version}`,
    ),

  getRollbackPreviewForPackage: (packageId) =>
    apiClient.post(
      `${BASE_URL}/api/change-packages/autoRollback?packageId=${packageId}`,
    ),
  getEnvironmentTypes: (projectIds) =>
    apiClient.get(
      `/environmentDataMaster/getEnvironmentTypes?projectIds=${projectIds.join(",")}`,
    ),

  getExecutionReport: ({ projectIds, envType, status, fromDate, toDate }) =>
    apiClient.get(
      `/environmentDataMaster/packageExecutionReport?projectIds=${projectIds.join(
        ",",
      )}&envType=${envType}&status=${status}&fromDate=${fromDate}&toDate=${toDate}`,
    ),

  saveReport: (payload) =>
    apiClient.post("/api/package-activity/savePackageActivityReport", payload),
  getSavedReports: () =>
    apiClient.get("/api/package-activity/getPackageReportNames"),
  getExecutionReportById: (id) =>
    apiClient.get(`/api/package-activity/savedActivityReport?reportId=${id}`),

  getPackageActivityFilter: (payload) => {
    return apiClient.post(`api/package-activity/filterdata`, payload);
  },

  //  user managment
  getAllUsers: () => apiClient.get("/api/getUsers"),
  addUser: (formData) => {
    console.log("formadata of user create", formData);

    return apiClient.post("/api/addUser", formData);
  },
  updateUser: (userId, formData) => {
    console.log("inside update user :", userId, formData);

    return apiClient.patch(`/api/updateUser/${userId}`, formData);
  },
  deleteUser: (userId) => {
    console.log("inside update user :", userId);

    return apiClient.delete(`/api/deleteUser/${userId}`);
  },
};
export const authApi = {
  // Use publicClient for login (no token interception)
  login: (credentials) => publicClient.post("/login", credentials),
  // These might still need the interceptor for refresh logic?
  refresh: (refreshToken) => publicClient.post("/refresh", { refreshToken }),
  logout: (refreshToken) => apiClient.post("/logout", { refreshToken }),
};
// ─── API ────────────────────────────────────────────────────────────────────
export const incidentApi = {
  getAll: () => apiClient.get("/api/incidenttrigger/getIncidentTrigger"),
  getByStatus: (status) =>
    apiClient.get(
      `/api/incidenttrigger/getIncidentTriggerByStatus?statusRequest=${status}`
    ),
};
export const gitApi = {
  // connection
  getTokenStatus: () => apiClient.get("/gitlab/getTokenStatus"),

  // repos
  getAllRepos: () => apiClient.get("/gitlab/getRepository"),


  getRepoDetailsById: (repoId) =>
    apiClient.get(`/gitlab/getTablesForGitlab?repoId=${repoId}`),


  getFieldsByTableName: (classId) => 
  apiClient.get(`/gitlab/getFieldsByTable?classId=${classId}`),


  manageRepos: (repoIds, projectId) =>
    apiClient.post("/gitlab/manageRepositories", { repoIds, projectId }),

  // token login
  tokenLogin: ({ baseUrl, token }) =>
    apiClient.post("/api/gitlab/token-login", {
      baseUrl,
      token,
    }),

  // oauth login (returns redirect URL)
  oauthLogin: (baseUrl) =>
    apiClient.get(`/gitlab/gitlabLogin`, {
      params: { baseUrl },
    }),

      getIncidentTrigger: () => apiClient.get("/api/incidenttrigger/getIncidentTrigger"),
  
  // NEW: Get incidents by status (NEW, IN_PROGRESS, RESOLVED, etc.)
  getIncidentTriggerByStatus: ({ statusRequest }) => 
    apiClient.get(`/api/incidenttrigger/getIncidentTriggerByStatus?statusRequest=${statusRequest}`),
};
export default apiClient;
