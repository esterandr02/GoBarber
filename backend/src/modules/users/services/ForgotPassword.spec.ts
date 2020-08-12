import AppError from '@shared/errors/AppError';

import FakeMail from '@shared/container/providers/Mail/fakes/FakeMail';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

import ForgotPasswordService from './ForgotPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeMail: FakeMail;
let fakeToken: FakeUserTokenRepository;
let forgotpassword: ForgotPasswordService;

describe('CreateUser', () => {
    // executa antes de cada teste dessa categoria
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeMail = new FakeMail();
        fakeToken = new FakeUserTokenRepository();
        forgotpassword = new ForgotPasswordService(
            fakeUserRepository,
            fakeMail,
            fakeToken,
        );
    });

    it('Should be able to send an email to recover password', async () => {
        const sendMail = jest.spyOn(fakeMail, 'sendMail');

        await fakeUserRepository.create({
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
        const generateToken = jest.spyOn(fakeToken, 'generate');

        const user = await fakeUserRepository.create({
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
