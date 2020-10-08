import AppError from '@shared/errors/AppError';

import FakeStorageFileProvider from '@shared/container/providers/Storage/fakes/FakeStorageFileProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUsersAvatarService from './UpdateUsersAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageFileProvider: FakeStorageFileProvider;
let updateUserAvatar: UpdateUsersAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageFileProvider = new FakeStorageFileProvider();

        updateUserAvatar = new UpdateUsersAvatarService(
            fakeUsersRepository,
            fakeStorageFileProvider,
        );
    });

    it('Should be able to update user avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });

        expect(user.avatar).toBe('avatar.png');
    });

    it('Should not be able to update avatar from non-existing user', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existent-user',
                avatarFilename: 'avatar.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageFileProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar-2.png',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.png');
        expect(user.avatar).toBe('avatar-2.png');
    });
});
