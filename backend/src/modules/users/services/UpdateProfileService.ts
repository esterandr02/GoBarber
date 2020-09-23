import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IHashProvider from '../providers/Hash/model/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password_confirmation?: string;
    new_password?: string;
}

@injectable()
export default class UpdateUsersAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        new_password,
        password_confirmation,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.', 401);
        }
        const existentUserMail = await this.usersRepository.findByEmail(email);

        if (existentUserMail && existentUserMail.id !== user_id) {
            throw new AppError('Email already in use.');
        }

        user.email = email;
        user.name = name;

        if (new_password) {
            if (!old_password) {
                throw new AppError('Confirm old password is missing.');
            }

            if (new_password !== password_confirmation) {
                throw new AppError(
                    'New password and password confirmation are different.',
                );
            }

            const isPasswordCorrect = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (isPasswordCorrect) {
                user.password = await this.hashProvider.generateHash(
                    new_password,
                );
            } else {
                throw new AppError('Old password is wrong.');
            }
        }

        return this.usersRepository.save(user);
    }
}
