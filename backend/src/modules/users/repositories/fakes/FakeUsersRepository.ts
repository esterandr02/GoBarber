import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create(userData: ICreateUsersDTO): Promise<User> {
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

    public async getAllProviders(except_user_id?: string): Promise<User[]> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }
        return users;
    }
}
