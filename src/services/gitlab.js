

const BASE_URL = "https://gitlab.com/api/v4";
const TOKEN = "glpat-nFNpLCrVqR3R4j7n9QbNzmM6MQpvOjEKdTpqcGdlbQ8.01.171x0gst7";

const headers = {
  "PRIVATE-TOKEN": TOKEN
};

// ---------- COMMON HELPER ----------
const safeFetch = async (url) => {
  const res = await fetch(url, { headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitLab API error ${res.status}: ${text}`);
  }

  return res;
};

// ---------- PROJECTS ----------
export const getProjects = async () => {
  const res = await safeFetch(
    `${BASE_URL}/projects?membership=true`
  );
  return res.json();
};

// ---------- COMMITS ----------
export const getCommits = async (projectId) => {
  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/repository/commits?per_page=5`
  );
  return res.json();
};

// ---------- PIPELINES ----------
export const getPipelines = async (projectId) => {
  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/pipelines?per_page=5`
  );
  return res.json();
};

// ---------- MERGE REQUESTS ----------
export const getMergeRequests = async (projectId) => {
  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/merge_requests?state=opened`
  );
  return res.json();
};

// ---------- REPO FILE TREE ----------
export const getRepoFiles = async (projectId) => {
  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/repository/tree?ref=main&recursive=true`
  );
  return res.json();
};

// ---------- RAW FILE (LATEST) ----------
export const getRawFile = async (projectId, filePath) => {
  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/repository/files/${encodeURIComponent(
      filePath
    )}/raw?ref=main`
  );
  return res.text();
};

// ---------- FILE COMMITS (FOR DRIFT) ----------
// export const getFileCommits = async (projectId, filePath) => {
//   const params = new URLSearchParams({
//     path: filePath,
//     per_page: 2
//   });

//   const res = await safeFetch(
//     `${BASE_URL}/projects/${projectId}/repository/commits?${params}`
//   );

//   return res.json();
// };

// ---------- RAW FILE BY COMMIT (FOR DRIFT) ----------
export const getRawFileByCommit = async (
  projectId,
  filePath,
  commitSha
) => {
  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/repository/files/${encodeURIComponent(
      filePath
    )}/raw?ref=${commitSha}`
  );

  return res.text(); // MUST be text (XML)
};


export const getFileCommits = async (
  projectId,
  filePath,
  // limit = 20
) => {
  const params = new URLSearchParams({
    path: filePath,
    // per_page: limit
  });

  const res = await safeFetch(
    `${BASE_URL}/projects/${projectId}/repository/commits?${params}`
  );

  return res.json();
};
const token = localStorage.getItem("accessToken");

// export const getBackendDrifts = async ({
//   projectId,
//   filePath,
//   oldCommit,
//   newCommit
// }) => {
//   const res = await fetch("http://192.168.0.120:8181/gitlab/gitlabDrift", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Access-Token": token  // Or whatever header your backend expects
//     },
//     body: JSON.stringify({
//       projectId,
//       filePath,
//       oldCommit,
//       newCommit
//     })
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch drift data");
//   }

//   return res.json();
// };



// Remove the undefined 'headers' variable and properly define token
const getBackendDrifts = async ({
  projectId,
  filePath,
  oldCommit,
  newCommit
}) => {
  const token = localStorage.getItem("accessToken");
  
  const res = await fetch("http://192.168.0.120:8181/gitlab/gitlabDrift", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`  // Use Bearer format like your other APIs
    },
    body: JSON.stringify({
      projectId,
      filePath,
      oldCommit,
      newCommit
    })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch drift data");
  }

  return res.json();
};

export { getBackendDrifts };