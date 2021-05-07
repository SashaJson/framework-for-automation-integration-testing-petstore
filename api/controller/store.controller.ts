import {JsonRequest} from '../request';
import {operations} from '../../.temp/types';

// TODO ADD TO METHOD VALIDATE JSON-SCHEMA

export class StoreController {
    async getInventory() {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/store/inventory')
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
