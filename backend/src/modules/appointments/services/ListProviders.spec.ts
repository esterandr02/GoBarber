// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('listProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('Should be able to show all appointments providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'JohnDoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'JohnTre@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'JohnQua@example.com',
            password: '123456',
        });

        const providers = await listProviders.execute(loggedUser.id);

        expect(providers).toEqual([user1, user2]);
    });
});
