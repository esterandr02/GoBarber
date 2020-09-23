import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.create,
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            password: Joi.string().min(6).required(),
            password_confirmation: Joi.string()
                .min(6)
                .valid(Joi.ref('password'))
                .required(),
            token: Joi.string().uuid().required(),
        },
    }),
    resetPasswordController.create,
);

export default passwordRouter;
