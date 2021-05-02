import {strict as assert} from 'assert';
import {PetController} from '../api/controller/pet.controller';

const pet = new PetController(); // TODO ADD API CLIENT

describe('User can', function () {

    it('receive pet by his id', async function () {

        const body = await pet.getById(9222968140498401472);
        assert(body.id == 9222968140498401472);

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
        assert(body.every((pet: any) => pet.tags.some((tag: any) => tag.name == 'string')));

    });

    it('can be added, updated and deleted', async function () {

        const petToCreate = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Cat",
            "photoUrls": [
                "http:test.com/image.jpg"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string",
                }
            ],
            "status": "available",
        };

        const addedPet = await pet.addNew(petToCreate);
        assert.deepEqual(addedPet, {
            ...petToCreate,
            id: addedPet.id
        }, 'first ASAAAAAAAP');

        const foundAddPet = await pet.getById(addedPet.id);
        assert.deepEqual(foundAddPet, {
            ...petToCreate,
            id: addedPet.id
        }, 'SECOND ASAAAAAAAP');

        const newerPet = {
            id: addedPet.id,
            category: {
                id: 1,
                name: "string2"
            },
            name: "Dog",
            photoUrls: [
                "http:test.com/image2.jpg"
            ],
            tags: [
                {
                    id: 1,
                    name: "string2",
                }
            ],
            status: "pending",
        };

        const updatePet = await pet.update(newerPet);
        assert.deepEqual(updatePet, newerPet, 'THIIRD ASAAAAAAAP');

        // TODO: assert 404 error
        await pet.delete(addedPet.id);

    });

});
