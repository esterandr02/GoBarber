import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(logged_user_id: string): Promise<User[]> {
        const providers = await this.usersRepository.getAllProviders(
            logged_user_id,
        );
        return providers;
    }
}
