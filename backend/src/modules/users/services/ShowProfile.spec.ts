import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowProfileService;

describe('ShowUserProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showUserProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('Should be able to show user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const profile = await showUserProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johnDoe@gmail.com');
        expect(profile.password).toBe('123456');
    });

    it('Should not be able to show non-existing user profile', async () => {
        await expect(
            showUserProfile.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
