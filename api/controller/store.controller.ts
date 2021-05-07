import { JsonRequest } from '../request';
import { operations, definitions } from '../../.temp/types';
import { BaseController } from './base.controller';

// TODO ADD TO METHOD VALIDATE JSON-SCHEMA

export class StoreController extends BaseController {

    async getOrderById(id: number | string) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/store/order/${id}`)
                .headers({ token: this.params.token })
                .send<operations['getOrderById']['responses']['200']['schema']>()
        )
    }

    async placeOrder(order: Omit<definitions['Order'], 'id'>) {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/store/order')
                .headers({ token: this.params.token })
                .method('POST')
                .body(order)
                .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }

    async getInventory() {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/store/inventory')
                .headers({ token: this.params.token })
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
