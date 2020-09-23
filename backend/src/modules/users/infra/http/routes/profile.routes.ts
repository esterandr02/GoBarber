import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            old_password: Joi.string().min(6),
            new_password: Joi.string().min(6),
            password_confirmation: Joi.string()
                .min(6)
                .valid(Joi.ref('new_password')),
        },
    }),
    profileController.update,
);

profileRouter.get('/', profileController.show);

export default profileRouter;
