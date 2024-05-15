import { default as axios } from "axios";

export const tryFetch = async (url, config) => {
    let verbose = config.verbose || false;
    if(verbose) {
        console.log('fetch', url, config);
    }
    let result;
    try {
        if(config.method === 'POST') {
            result = await axios.post(url, config.body, {
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                    ...(config.headers || {})
                }
            })
        } 
        else if(config.method === 'GET') {
            result = await axios.get(url, {
                headers: {                    
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                    ...(config.headers || {})
                }
            })
        }
    } catch (err) {
        throw new Error(`[ThrottledFetchError]: ${err}`);
    }
    return result;
}

export const getHeaders = (accessToken) => ({
    accept: 'application/json',
    'content-type': 'application/json',
    ...accessToken ? {'Authorization': `Bearer ${accessToken}` } : {}
});
