import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import ResetPasswordService from './ResetPasswordService';

import FakeHashProvider from '../providers/Hash/fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeTokensRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const { token } = await fakeTokensRepository.generate(user.id);

        const generateHashPassword = jest.spyOn(
            fakeHashProvider,
            'generateHash',
        );

        await resetPassword.execute({
            token,
            password: '123123',
        });

        const findUser = await fakeUsersRepository.findById(user.id);

        expect(generateHashPassword).toHaveBeenCalledWith('123123');
        expect(findUser?.password).toBe('123123');
    });

    it('Should not be able to reset the password with non-exixting token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to reset the password with non-exixting user', async () => {
        const { token } = await fakeTokensRepository.generate(
            'non-exixting-user-id',
        );

        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to reset the password if passed more than 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const { token } = await fakeTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                token,
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
