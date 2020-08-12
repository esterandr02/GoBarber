import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';

import IMail from '@shared/container/providers/Mail/model/IMail';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class ForgotPasswordService {
    constructor(
        @inject('UserRepo')
        private userRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMail,

        @inject('UserTokenRepo')
        private userTokenRepository: IUserTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist !');
        }

        await this.userTokenRepository.generate(user.id);

        this.mailProvider.sendMail(email, 'recuperacao de senha');
    }
}

export default ForgotPasswordService;
