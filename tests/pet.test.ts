import got from 'got'
import {strict as assert} from 'assert';
import {URLSearchParams} from "url";

describe('User can', function () {

    it('receive pet by his id', async function () {

        const response = await got('https://petstore.swagger.io/v2/pet/9222968140498399655');
        const body = JSON.parse(response.body);

        assert(body.id == 9222968140498399655, `ASAAP`);

    });

    it('can be received by status', async function () {

        let response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: {status: 'available'}
        });
        let body = JSON.parse(response.body);
        assert(body.length > 0);

        response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: {status: 'pending'}
        });
        body = JSON.parse(response.body);
        assert(body.length > 0);

        response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: {status: 'sold'}
        });
        body = JSON.parse(response.body);
        assert(body.length > 0);

        response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: new URLSearchParams({status: ['pending', 'available']})
        });
        body = JSON.parse(response.body);
        assert(body.length > 0);
        assert(body.some((pet: any) => pet.status == 'available'));
        assert(body.some((pet: any) => pet.status == 'pending'));
        assert(!body.some((pet: any) => pet.status == 'sold'));

    });

    it('can be received by tag', async function () {

        const response = await got('https://petstore.swagger.io/v2/pet/findByTags', {
            searchParams: {tags: 'string'}
        });
        const body = JSON.parse(response.body);
        assert(body.length > 0);
        assert(body.some((pet: any) => pet.tags.some((tag: any) => tag.name == 'string')));

    });

});
