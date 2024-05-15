export const __rej_configs = {
    '/auth/accesstokenrequest': {
        limit: 3,
        message: 'Warning, AccessTokenRequest failure limit will be exceeded. This will trigger a 1-hour lock on your API User. Please check your configuration and ensure you have supplied the correct credentials to SDK.initialize. If you are a Partner Program Vendor, please ensure that you are using credentials related to the development stage you are attempting to access.'
    },
    '*': {
        limit: 100,
        message: 'Warning, this operation will exceed 100 failures for the same endpoint this hour. Too many failures on the same operation will trigger the rate limiting system, slowing your API calls. To avoid this, please ensure you are not looping over calls that generate 400 level responses (such as an entity lookup with missing parameter, or data from a previous session).'
    },
    'total': {
        limit: 200,
        message: 'Warning, this operation will exceed 200 total failures this hour. Doing so will trigger rate limits on your API session.'
    }
}