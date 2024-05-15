
import { getRejections } from "../throttleController/throttleController.js";
import { stupid } from "./stupidtester.js";

export const rejectionTest = async (SDK) => {  
    await SDK.api.sim.order.item(100);

    return stupid()
        .dBox('Test Rejection')
        .describe('/order/item?id=100 should fail and push to rejected.')
        .expect(getRejections())
        .toEqual({
            totalRejections: 1,
            'order/item': 1, 
        });
}