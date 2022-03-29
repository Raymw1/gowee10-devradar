import Constants from "expo-constants";
import axios from "axios";

const api = axios.create({ baseURL: Constants.manifest.extra.apiURL });

export default api;
