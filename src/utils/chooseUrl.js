import { GLOBAL_CONFIG } from "../config/global.js";
import { URLS } from "../config/urls.js";

export const chooseUrl = (env) => {
    const release = GLOBAL_CONFIG.release;
    return URLS[release][env];
}