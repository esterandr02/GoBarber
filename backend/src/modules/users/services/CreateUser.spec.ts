import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashPassword from '../providers/Hash/fake/FakeHashPassword';

import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashPassword: FakeHashPassword;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashPassword = new FakeHashPassword();
        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashPassword,
        );
    });

    it('Should be able to create a new user with no email from another', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create two users with the same email', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johnDoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
