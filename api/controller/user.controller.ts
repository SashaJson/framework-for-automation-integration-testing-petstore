import { operations } from '../../.temp/types';
import { JsonRequest } from '../request';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
    async login(credentials: { username: string, password: string }): Promise<string> {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('/user/login')
                .searchParams(credentials)
                .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}
