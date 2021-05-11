import type { Options, Method } from 'got';
import { CookieJar } from 'tough-cookie';
import got from 'got';

export class JsonRequest {

    protected options: any = {
        responseType: 'json'
    }

    public prefixUrl(url: string | URL): this {
        this.options.prefixUrl = url
        return this
    }

    public url(url: string | URL): this {
        this.options.url = url;
        return this;
    }

    public method(method: Method) {
        this.options.method = method;
        return this;
    }

    public cookieJar(cookiesJar: CookieJar): this {
        this.options.cookieJar = cookiesJar;
        return this
    }

    public headers(headers: Record<string, string | undefined>): this {
        this.options.headers = this.options.headers ?? {}
        this.options.headers = {
            ...this.options.headers,
            ...headers
        }
        return this;
    }

    public searchParams(searchParams: Options['searchParams']): this {
        this.options.searchParams = searchParams;
        return this;
    }

    public body(body: any): this {
        this.options.json = body;
        return this;
    }

    public send <T = any> () {
        return got<T>(this.options);
    }

}
