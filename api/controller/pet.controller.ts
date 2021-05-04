import {URLSearchParams} from 'url';
import {JsonRequest} from '../request';
import {definitions} from '../../.temp/types';

export class PetController {

    async getById(id: number | string) {
        return (
            await new JsonRequest()
                .url(`https://petstore.swagger.io/v2/pet/${id}`)
                .send()
        ).body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
                .url('https://petstore.swagger.io/v2/pet/findByTags')
                .searchParams(new URLSearchParams({tags}))
                .send()
        ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
                .url('https://petstore.swagger.io/v2/pet/findByStatus')
                .searchParams(new URLSearchParams({status}))
                .send()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequest()
                .url('https://petstore.swagger.io/v2/pet/')
                .method('POST')
                .body(pet)
                .send()
        ).body
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
                .url(`https://petstore.swagger.io/v2/pet/${id}`)
                .method('DELETE')
                .send()
        ).body
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequest()
                .url('https://petstore.swagger.io/v2/pet/')
                .method('PUT')
                .body(pet)
                .send()
        ).body
    }

}
