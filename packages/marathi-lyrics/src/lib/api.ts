import { MarathiApi } from "@vipulwaghmare/apis";
import { axiosConfig, } from "./axios-instance";

const api = new MarathiApi(axiosConfig, undefined,); // Create an API instance

export default api;