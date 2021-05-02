import got from 'got'
import {strict as assert} from 'assert';

describe('User can', function () {

    it('receive pet by his id',async function () {

        const response = await got('https://petstore.swagger.io/v2/pet/9222968140498399655');
        const body = JSON.parse(response.body);

        assert(body.id == 9222968140498399655, `ASAAP`);

    });

});
