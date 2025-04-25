import { MarathiApi } from "@vipulwaghmare/apis";
import { axiosConfig, axiosInstance, } from "./axios-instance";

const api = new MarathiApi(axiosConfig, undefined, axiosInstance); // Create an API instance

export default api;