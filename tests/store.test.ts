import { strict as assert } from 'assert';
import { PetController } from '../api/controller/pet.controller';
import { StoreController } from '../api/controller/store.controller';
import { definitions } from '../.temp/types';

const pet = new PetController();
const store = new StoreController();

describe('Store', function () {

    it('should return his inventory, and correctly updates statuses', async function () {
        const inventory = await store.getInventory();
        assert(Object.keys(inventory).length > 0);

        await pet.addNew(petWithStatus('sold'));
        const inventoryWithSoldAdded = await store.getInventory();
        assert.equal(inventoryWithSoldAdded.available, inventory.available + 1);

        await pet.addNew(petWithStatus('available'));
        const inventoryWithAvailableAdded = await store.getInventory();
        assert.equal(inventoryWithAvailableAdded.available, inventory.available + 1);

        await pet.addNew(petWithStatus('pending'));
        const inventoryWithPendingAdded = await store.getInventory();
        assert.equal(inventoryWithPendingAdded.available, inventory.available + 1);
    });

});

function petWithStatus(status: definitions['Pet']['status']) {
    return {
        category: {
            id: 0,
            name: "string"
        },
        name: "Cat",
        photoUrls: [
            "http:test.com/image.jpg"
        ],
        tags: [
            {
                id: 0,
                name: "string"
            }
        ],
        status
    };
}
