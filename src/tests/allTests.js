import { SDK } from "../index.js";
import { GLOBAL_CONFIG } from "../config/global.js";
import { basicOpsTest } from "./basicOps.test.js";
import { entityItemTest } from "./entityItem.test.js";
import { entityFindTest } from "./entityFind.test.js";
import { rejectionTest } from "./rejection.test.js";
import { stupid } from "./stupidtester.js";
import { throttleRateRandomTest, throttleTest } from "./throttle.test.js";
import { testBatchCreation } from "./testBatchCreation.test.js";

const test = async () => {    

    //init
    await SDK.initialize(GLOBAL_CONFIG.credentials, { 
        limitPerHour: 50000,
        limitPerMinute: 5000,
        limitPerSec: 1000,
        release: 'devel', 
        verbose: true 
    });

    const intro = '\u2588\u2588 >> Running all Tests! << \u2588\u2588';
    const box = `\u2588`.repeat(intro.length);
    console.log(box);
    console.log(intro);
    console.log(box);

    const results = {
        // 'Throttle Test': (await throttleRateRandomTest(SDK)).evaluate(),
        'Test Batch User Create': (await testBatchCreation(SDK)).evaluate(),
        'Basic Ops': (await basicOpsTest(SDK)).evaluate(),
        'Test entity/item': (await entityItemTest(SDK)).evaluate(),
        'Test entity/find': (await entityFindTest(SDK)).evaluate(),
        'Test rejections': (await rejectionTest(SDK)).evaluate(),
    }

    console.log('\nTestResults', results);
    stupid().dBox(`Passing? ${Object.values(results).every(x => x === true)}`);

}

test();