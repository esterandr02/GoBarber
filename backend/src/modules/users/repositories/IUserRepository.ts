import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(user_id: string): Promise<User | undefined>;
    create(user: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
