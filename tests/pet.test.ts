import {strict as assert} from 'assert';
import {PetController} from '../api/controller/pet.controller';

const pet = new PetController(); // TODO ADD API CLIENT

describe('User can', function () {

    it('receive pet by his id', async function () {

        const body = await pet.getById(9222968140498399655);
        assert(body.id == 9222968140498399655);

    });

    it('can be received by status', async function () {

        let body = await pet.findByStatus('available');
        assert(body.length > 0);

        body = await pet.findByStatus('pending');
        assert(body.length > 0);

        body = await pet.findByStatus('sold');
        assert(body.length > 0);

        body = await pet.findByStatus(['pending', 'available']);
        assert(body.length > 0);
        assert(body.some((pet: any) => pet.status == 'available'));
        assert(body.some((pet: any) => pet.status == 'pending'));
        assert(!body.some((pet: any) => pet.status == 'sold'));

    });

    it('can be received by tag', async function () {

        const body = await pet.findByTags('string');
        assert(body.length > 0);
        assert(body.some((pet: any) => pet.tags.some((tag: any) => tag.name == 'string')));

    });

});
