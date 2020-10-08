import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/Hash/fake/FakeHashProvider';

import CreateUsersService from './CreateUsersService';
import AuthenticateUsersService from './AuthenticateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsers: CreateUsersService;
let authenticateUsers: AuthenticateUsersService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUsers = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        authenticateUsers = new AuthenticateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to authenticate user', async () => {
        const user = await createUsers.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const authenticate = await authenticateUsers.execute({
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        expect(authenticate).toHaveProperty('token');
        expect(authenticate.user).toEqual(user);
    });

    it('Should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUsers.execute({
                email: 'johnDoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate user with wrong password', async () => {
        await createUsers.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await expect(
            authenticateUsers.execute({
                email: 'johnDoe@gmail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
