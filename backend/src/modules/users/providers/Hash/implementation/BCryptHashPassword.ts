import { hash, compare } from 'bcryptjs';
import IHashPassword from '../model/IHashPassword';

export default class BCryptHashPassword implements IHashPassword {
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return compare(payload, hashed);
    }
}
