import IHashPassword from '../model/IHashPassword';

export default class BCryptHashPassword implements IHashPassword {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return payload === hashed;
    }
}
