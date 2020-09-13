import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashPassword from '../providers/Hash/fake/FakeHashProvider';

import CreateUsersService from './CreateUsersService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashPassword: FakeHashPassword;
let createUsers: CreateUsersService;

describe('CreateUsers', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashPassword = new FakeHashPassword();
        createUsers = new CreateUsersService(
            fakeUserRepository,
            fakeHashPassword,
        );
    });

    it('Should be able to create a new user with no email from another', async () => {
        const user = await createUsers.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create two users with the same email', async () => {
        await createUsers.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await expect(
            createUsers.execute({
                name: 'John Doe',
                email: 'johnDoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
