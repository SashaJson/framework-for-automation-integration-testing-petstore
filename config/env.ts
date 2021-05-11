import {cleanEnv, str, url} from 'envalid';

export const CONFIG = cleanEnv(process.env, {
    PETSTORE_URL: url({
        default: '',
        desc: 'API URL to be tested'
    }),

    PETSTORE_API_PREFIX_PATH: str({
        default: '',
        desc: 'Prefix part in URL path to be prepended to all requests'
    }),

    PETSTORE_SWAGGER_URL: url({
        default: '',
        desc: 'URL to SWAGGER JSON documentation'
    })
});
