import { PetController } from './controller/pet.controller';
import { StoreController } from './controller/store.controller';
import { CookieJar } from 'tough-cookie';

export class ApiClient {
    public readonly pet: PetController;
    public readonly store: StoreController;
    public readonly user: UserController;

    constructor(params?: { token?: string, cookies?: CookieJar }) {
        const defaultParams = {
            cookies: new CookieJar()
        };
        const mergeParams = {
            ...defaultParams,
            ...params
        };

        this.pet = new PetController(mergeParams);
        this.store = new StoreController(mergeParams);
        this.user = new UserController(mergeParams);
    }

}
