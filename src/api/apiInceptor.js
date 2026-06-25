import axios from "axios";

// const BASE_URL = "/";
const BASE_URL = "http://192.168.0.17:8081";
const apiInterceptor = axios.create({
    baseURL: BASE_URL
});
// Add access token to every request
apiInterceptor.interceptors.request.use(
    (config) => {

        const accessToken =
            localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle token expiry automatically
apiInterceptor.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;
        console.log("apiInceptor ----->  ", error.response?.status);
        // Prevent infinite loop
        if (
            (error.response?.status === 401 ||
             error.response?.status === 403) &&
            !originalRequest._retry
        ) {
            console.log("Hello Expire");
            originalRequest._retry = true;

            try {

                const refreshToken =
                    localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("Refresh token missing");
                }
                console.log("BASE_URL =", BASE_URL);
            console.log("Refresh URL =", `${BASE_URL}/api/auth/refresh`);

                const refreshResponse =
                    await axios.post(
                        `/api/auth/refresh`,                               // for server
                        //  `${BASE_URL}/api/auth/refresh`,                // for local
                        {
                            refreshToken
                        }
                    );

                const newAccessToken = refreshResponse.data.data.accessToken;

                // Save new access token
                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                console.log("New Token "+ newAccessToken);

                // Update original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // Retry failed request
                return apiInterceptor(originalRequest);

            } catch (refreshError) {

                console.log(
                    "Refresh token expired. Redirecting to login..."
                );

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                // window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiInterceptor;