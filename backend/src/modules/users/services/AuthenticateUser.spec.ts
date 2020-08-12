import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashPassword from '../providers/Hash/fake/FakeHashPassword';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashPassword: FakeHashPassword;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashPassword = new FakeHashPassword();

        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashPassword,
        );
        authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashPassword,
        );
    });

    it('Should be able to authenticate user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const authenticate = await authenticateUser.execute({
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        expect(authenticate).toHaveProperty('token');
        expect(authenticate.user).toEqual(user);
    });

    it('Should not be able to authenticate an nonexistent user', async () => {
        // usuario nao criado
        expect(
            authenticateUser.execute({
                email: 'johnDoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to authenticate user', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        expect(
            authenticateUser.execute({
                email: 'johnDoe@gmail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
