import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IStorageFileProvider from '@shared/container/providers/Storage/model/IStorageFileProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
export default class UpdateUsersAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageFileProvider')
        private storageFileProvider: IStorageFileProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            await this.storageFileProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageFileProvider.saveFile(
            avatarFilename,
        );

        user.avatar = filename;
        await this.usersRepository.save(user); // serve para criar ou atualizar informacoes no banco.

        return user;
    }
}
