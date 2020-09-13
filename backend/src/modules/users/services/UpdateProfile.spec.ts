import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/Hash/fake/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateProfileService;

describe('UpdateUserProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateUserProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to update user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateUserProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johnTre@gmail.com',
        });

        expect(updatedUser.email).toBe('johnTre@gmail.com');
        expect(updatedUser.name).toBe('John Tre');
    });

    it('Should not be able to update non-existing user profile', async () => {
        await expect(
            updateUserProfile.execute({
                user_id: 'non-exixting-user-id',
                name: 'John Tre',
                email: 'johnTre@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to update to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johnTre@gmail.com',
            password: '123456',
        });

        await expect(
            updateUserProfile.execute({
                user_id: user.id,
                name: 'John Tre',
                email: 'johnDoe@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateUserProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            old_password: '123456',
            new_password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('Should not be able to update the password without old password confirmation', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await expect(
            updateUserProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johnDoe@gmail.com',
                new_password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to update the password with wrong old password confirmation', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await expect(
            updateUserProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johnDoe@gmail.com',
                old_password: 'wrong-password',
                new_password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
