import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IStorageFile from '@shared/container/providers/Storage/model/IStorageFile';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepo')
        private usersRepository: IUsersRepository,

        @inject('StorageFile')
        private storageFile: IStorageFile,
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
            await this.storageFile.deleteFile(user.avatar);
        }

        const filename = await this.storageFile.saveFile(avatarFilename);

        user.avatar = filename;
        await this.usersRepository.save(user); // serve para criar ou atualizar informacoes no banco.

        return user;
    }
}

export default UpdateUserAvatarService;
