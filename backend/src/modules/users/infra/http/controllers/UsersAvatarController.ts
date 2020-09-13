import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUsersAvatarService from '@modules/users/services/UpdateUsersAvatarService';

export default class UsersAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUsersAvatar = container.resolve(UpdateUsersAvatarService);

        const user = await updateUsersAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json(user);
    }
}
