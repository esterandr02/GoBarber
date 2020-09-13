import User from '../infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(user_id: string): Promise<User | undefined>;
    create(user: ICreateUsersDTO): Promise<User>;
    save(user: User): Promise<User>;
    getAllProviders(except_user_id?: string): Promise<User[]>;
}
