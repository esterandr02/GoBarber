import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/Mail/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import ForgotPasswordService from './ForgotPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeTokens: FakeUserTokensRepository;
let forgotpassword: ForgotPasswordService;

describe('CreateUser', () => {
    // executa antes de cada teste dessa categoria
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeTokens = new FakeUserTokensRepository();
        forgotpassword = new ForgotPasswordService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeTokens,
        );
    });

    it('Should be able to send an email to recover password', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await forgotpassword.execute({
            email: 'johnDoe@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to send a recover password email to a non-existing user', async () => {
        await expect(
            forgotpassword.execute({
                email: 'johnDoe@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should generate forgot password token', async () => {
        const generateToken = jest.spyOn(fakeTokens, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: '123456',
        });

        await forgotpassword.execute({
            email: 'johnDoe@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
