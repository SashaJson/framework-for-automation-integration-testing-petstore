import { definitions } from '../.temp/types';
import { strict as assert } from 'assert';
import { ApiClient } from '../api/client';

describe('Store', function () {

    it('should return his inventory, and correctly updates statuses', async function () {

        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin'});

        const inventory = await adminClient.store.getInventory();
        assert(Object.keys(inventory).length > 0);

        await adminClient.pet.addNew(petWithStatus('sold'));
        const inventoryWithSoldAdded = await adminClient.store.getInventory();
        assert.equal(inventoryWithSoldAdded.available, inventory.available);

        await adminClient.pet.addNew(petWithStatus('available'));
        const inventoryWithAvailableAdded = await adminClient.store.getInventory();
        assert.equal(inventoryWithAvailableAdded.available, inventory.available + 1);

        await adminClient.pet.addNew(petWithStatus('pending'));
        const inventoryWithPendingAdded = await adminClient.store.getInventory();
        assert.equal(inventoryWithPendingAdded.available, inventory.available + 1);
    });

    it('allows to place order by user, and admin can see created order', async function () {

        const userClient = await ApiClient.loginAs({ username: 'user', password: 'user' });

        const order = {
          petId: 1,
          quantity: 1,
            shipDate: new Date().toISOString()
        };

        const placeOrder = await userClient.store.placeOrder(order);
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' });
        await adminClient.store.getOrderById(placeOrder.id);

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
