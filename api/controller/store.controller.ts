import { JsonRequest } from '../request';
import { operations, definitions } from '../../.temp/types';
import { BaseController } from './base.controller';

// TODO ADD TO METHOD VALIDATE JSON-SCHEMA

export class StoreController extends BaseController {

    async getOrderById(id: number | string) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url(`/store/order/${id}`)
                .send<operations['getOrderById']['responses']['200']['schema']>()
        )
    }

    async placeOrder(order: Omit<definitions['Order'], 'id'>) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('/store/order')
                .method('POST')
                .body(order)
                .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }

    async getInventory() {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('store/inventory')
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
