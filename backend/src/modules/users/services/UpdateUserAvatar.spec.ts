import AppError from '@shared/errors/AppError';

import FakeStorageFile from '@shared/container/providers/Storage/fakes/FakeStorageFile';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageFile: FakeStorageFile;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeStorageFile = new FakeStorageFile();

        updateUserAvatar = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageFile,
        );
    });

    it('Should be able to update user avatar', async () => {
        const user = await fakeUserRepository.create({
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

    it('Should not be able to update avatar from non existent user', async () => {
        expect(
            updateUserAvatar.execute({
                user_id: 'non-existent-user',
                avatarFilename: 'avatar.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should delete old avatar when updating new one', async () => {
        // spyOne: saber se um metodo foi disparado
        const deleteFile = jest.spyOn(fakeStorageFile, 'deleteFile');

        const user = await fakeUserRepository.create({
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
