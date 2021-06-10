import { definitions, operations } from '../../.temp/types';
import { JsonRequest } from '../request';
import { BaseController } from './base.controller';

// TODO ADD TO METHOD VALIDATE JSON-SCHEMA

export class UserController extends BaseController {

    async register(userToCreate: Omit<definitions['User'], 'id' | 'userStatus'>) {
        return (await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('/user/register')
                .body(userToCreate)
                .send<operations['registerUser']['responses']['200']['schema']>()
        ).body
    }

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
