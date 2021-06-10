import { PetController } from './controller/pet.controller';
import { StoreController } from './controller/store.controller';
import { UserController } from './controller/user.controller';
import { ControllerOptions } from './controller/base.controller';
import { CookieJar } from 'tough-cookie';
import { CONFIG } from '../config/env';

export class ApiClient {
    public readonly pet: PetController;
    public readonly store: StoreController;
    public readonly user: UserController;

    constructor(options?: Partial<ControllerOptions>) {
        const defaultOptions = {
            cookieJar: new CookieJar(),
            prefixUrl: CONFIG.PETSTORE_URL,
            prefixPath: CONFIG.PETSTORE_API_PREFIX_PATH
        };
        const mergeParams = {
            ...defaultOptions,
            ...options
        };

        this.pet = new PetController(mergeParams);
        this.store = new StoreController(mergeParams);
        this.user = new UserController(mergeParams);
    }

    static unauthorized() {
        return new ApiClient();
    }

    static async loginAs(credentials: { username: string, password: string }) {
        return new ApiClient({
           token: await ApiClient.unauthorized().user.login(credentials)
        });
    }

}
