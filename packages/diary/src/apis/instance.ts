import { axiosInstance, axiosConfig } from "@vipulwaghmare/auth-frontend";
import { AuthApi, DiaryApi, UsersApi } from "@vipulwaghmare/apis";

const api = new DiaryApi(axiosConfig, undefined, axiosInstance); // Create an API instance

export const authApi = new AuthApi(axiosConfig, undefined, axiosInstance);
export const userApi = new UsersApi(axiosConfig, undefined, axiosInstance);

export default api;