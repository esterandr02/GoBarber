import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({
            user_id: request.user.id,
        });

        delete user.password;

        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            email,
            old_password,
            password_confirmation,
            new_password,
        } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id: request.user.id,
            name,
            email,
            password_confirmation,
            old_password,
            new_password,
        });

        delete user.password;
        return response.json(user);
    }
}
