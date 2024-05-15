import { SDK } from "../index.js";
import { ThrottleEvents } from "../throttleController/throttleEvents.js";
import { stupid } from "./stupidtester.js";
import { testBatchCreation } from "./testBatchCreation.test.js";
/**
 * 
 * @param {SDK} SDK 
 * @returns 
 */
export const throttleTest = async (SDK) => {
    let paused = false;
    ThrottleEvents.on('pause', () => { paused = true; })
    for(let i = 0; i < 500; i++) {
        await SDK.api.sim.user.item(29721);
    }

    return stupid()
        .dBox('Throttle 500 calls')
        .expect(paused)
        .toBeFalse();
}

/**
 * 
 * @param {SDK} SDK 
 * @returns 
 */
export const throttleRateRandomTest = async (SDK) => {
    let paused = false;
    ThrottleEvents.on('pause', () => { paused = true; });
    let i = 0;
    const waitMs = ms => new Promise((res, rej) => setTimeout(() => res(), ms));
    const test = async () => {
        // await waitMs(Math.random()*1000);
        
        ++i;
    }

    while(i < 5000) {
        await test();
    }

    return stupid()
        .dBox('Throttle Rate Random 5000 calls')
        .expect(paused)
        .toBeFalse();
}