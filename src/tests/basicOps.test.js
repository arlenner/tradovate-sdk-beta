
import { stupid } from "./stupidtester.js";

export const basicOpsTest = async (SDK) => {    
    return stupid()
        .dBox('Basic Ops user/list')
        .expect(await SDK.api.sim.user.list())
        .toBeNotNull();
}