import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

import ResetPasswordService from './ResetPasswordService';

import FakeHashPassword from '../providers/Hash/fake/FakeHashPassword';

let fakeUserRepository: FakeUserRepository;
let fakeTokenRepository: FakeUserTokenRepository;
let fakeHashPassword: FakeHashPassword;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
    // executa antes de cada teste dessa categoria
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeTokenRepository = new FakeUserTokenRepository();
        fakeHashPassword = new FakeHashPassword();
        resetPassword = new ResetPasswordService(
            fakeUserRepository,
            fakeTokenRepository,
            fakeHashPassword,
        );
    });

    it('Should be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const { token } = await fakeTokenRepository.generate(user.id);

        const generateHashPassword = jest.spyOn(
            fakeHashPassword,
            'generateHash',
        );

        await resetPassword.execute({
            token,
            password: '123123',
        });

        const findUser = await fakeUserRepository.findById(user.id);

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
        const { token } = await fakeTokenRepository.generate(
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
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        const { token } = await fakeTokenRepository.generate(user.id);

        // trocamos uma funcao natural por uma customizada (setar 3 horas a mais)
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
