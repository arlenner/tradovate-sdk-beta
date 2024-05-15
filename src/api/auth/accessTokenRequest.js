import { chooseUrl } from '../../utils/chooseUrl.js';
import { tryFetch, getHeaders } from '../../utils/tryFetch.js';

/**
 * Call the `/auth/accessTokenRequest` endpoint.
 * 
 * @param {{ credentials: { name: string, password: string, appId: string, appVersion: string, deviceId: string, cid: number, sec: string }, autoSave: boolean }, env: 'live' | 'demo'} param0 
 * @returns {Promise<{ errorText?: string, accessToken: string, expirationTime: string, passwordExpirationTime: string, userStatus: 'Active' | 'Closed' | 'Initiated' | 'TemporarilyLocked' | 'UnconfirmedEmail', userId: number, name: string, hasLive: boolean }>}
 */
export async function accessTokenRequest({ credentials }, env = 'live') {
    
    const headers = getHeaders();
    
    const url = chooseUrl(env);
    
    let result = await tryFetch(url + '/auth/accesstokenrequest', { method: 'POST', headers, body: credentials });

    return result;
}