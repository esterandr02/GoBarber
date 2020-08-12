import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);
        this.users.push(user);

        return user;
    }

    public async findById(user_id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === user_id);

        return findUser;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;
        return user;
    }
}
// O typeORM ja possui metodos basicos para criar, listar, deletar, etc

export default UsersRepository;
