import { operations } from '../../.temp/types';
import { JsonRequest } from '../request';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
    async login(credentials: { username: string, password: string }): Promise<string> {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/user/login')
                .searchParams(credentials)
                .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}
