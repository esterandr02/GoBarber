import { getRepository, Repository, Not } from 'typeorm';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }

    public async findById(user_id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(user_id);
        return user;
    }

    public async create(user_data: ICreateUsersDTO): Promise<User> {
        const user = this.ormRepository.create(user_data);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async getAllProviders(except_user_id?: string): Promise<User[]> {
        let users: User[];

        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }
        return users;
    }
}
