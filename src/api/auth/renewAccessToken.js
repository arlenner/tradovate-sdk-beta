import { getHeaders } from '../../utils/tryFetch.js';

/**
 * Call the `/auth/renewAccessToken` endpoint.
 * 
 * @param {{ token: string, env: 'live' | 'demo' }} param0
 * @returns {Promise<{ errorText?: string, accessToken: string, expirationTime: string, passwordExpirationTime: string, userStatus: 'Active' | 'Closed' | 'Initiated' | 'TemporarilyLocked' | 'UnconfirmedEmail', userId: number, name: string, hasLive: boolean }>}
 */
export const renewAccessToken = (app, simSocket, liveSocket) => async function renewAccessToken({ env = 'demo' }) {
    const { accessToken } = app.Storage.getAuthResponseData();
    
    const headers = getHeaders(accessToken);

    const endpoint = `/auth/renewAccessToken`;

    if(liveSocket || simSocket) {
        const [ep, query] = endpoint.slice(1).split('?');
        return await app.wsSend({ url: ep, query, env });
    } else {
        return await app.fetch(url + endpoint, { method: 'GET', headers });
    }
} 