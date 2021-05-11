import { URLSearchParams } from 'url';
import { JsonRequest } from '../request';
import { definitions, operations } from '../../.temp/types';
import { validate, loadAPISpec } from '../validator';
import { BaseController } from './base.controller';

// TODO ADD TO ALL METHOD VALIDATE JSON-SCHEMA

export class PetController extends BaseController {

    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url(`/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;

        const apiSpec = await loadAPISpec();
        const schema = apiSpec.paths['/pet/{petId}']['get']['responses']['200']['schema'];

        validate(schema, body);
        return body;
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('/pet/findByTags')
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('/pet/findByStatus')
                .searchParams(new URLSearchParams({status}))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('/pet/')
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url(`pet/${id}`)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequest()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url('pet/')
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

}
