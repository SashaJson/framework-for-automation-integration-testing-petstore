import type {Options, Method} from 'got';
import got from 'got';

export class JsonRequest {

    protected options: any = {
        requestType: 'json'
    }

    public url(url: string | URL): this {
        this.options.url = url;
        return this;
    }

    public method(method: Method) {
        this.options.method = method;
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

    public send() {
        return got<any>(this.options);
    }

}