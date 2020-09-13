import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const createUsers = container.resolve(CreateUsersService);

            const user = await createUsers.execute({
                name,
                email,
                password,
            });

            delete user.password;

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
