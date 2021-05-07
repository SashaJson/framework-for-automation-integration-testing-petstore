import { strict as assert } from 'assert';
import { PetController } from '../api/controller/pet.controller';
import { definitions } from '../.temp/types';

const pet = new PetController(); // TODO ADD API CLIENT

describe('Pet', function () {

    it('can be received by his id', async function () {

        const body = await pet.getById(1);
        assert(body.id == 1);

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
        assert(body.some(pet => pet.status == 'available'));
        assert(body.some(pet => pet.status == 'pending'));
        assert(!body.some(pet => pet.status == 'sold'));

    });

    it('can be received by tag', async function () {

        const body = await pet.findByTags('tag1');
        assert(body.length > 0);
        assert(body.every(pet => pet.tags.some(tag => tag.name == 'tag1')));

    });

    it('can be added, updated and deleted', async function () {

        const petToCreate: Omit<definitions['Pet'], 'id'> = {
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
        });

        const foundAddPet = await pet.getById(addedPet.id);
        assert.deepEqual(foundAddPet, {
            ...petToCreate,
            id: addedPet.id
        });

        const newerPet: definitions['Pet'] = {
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
        assert.deepEqual(updatePet, newerPet);

        // TODO: assert 404 error
        await pet.delete(addedPet.id);

    });

});
