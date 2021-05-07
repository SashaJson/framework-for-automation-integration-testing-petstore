import { JsonRequest } from '../request';
import { operations } from '../../.temp/types';
import { BaseController } from './base.controller';

// TODO ADD TO METHOD VALIDATE JSON-SCHEMA

export class StoreController extends BaseController {
    async getInventory() {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/store/inventory')
                .headers({ token: this.params.token })
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
