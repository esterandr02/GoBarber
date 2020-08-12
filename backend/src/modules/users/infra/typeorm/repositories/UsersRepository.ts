import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
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

    public async create(user_data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(user_data);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}
// O typeORM ja possui metodos basicos para criar, listar, deletar, etc

export default UsersRepository;
