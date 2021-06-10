import { definitions } from '../.temp/types'
import { ApiClient } from '../api/client'
import { strict as assert } from 'assert'

describe('User', () => {

    it('can register', async () => {

        const userToCreate: Omit<definitions['User'], 'id' | 'userStatus'> = {
            firstName: 'Sasha',
            lastName: 'Json',
            email: `sashamiller666+${Date.now()}@gmail.com`,
            username: `sasha${Date.now()}`,
            password: '123456789'
        };

        const createUser = await ApiClient.unauthorized().user.register(userToCreate);

        assert.deepEqual(createUser, {
           ...userToCreate,
           id: createUser.id,
           userStatus: createUser.userStatus
        });

    });

});
