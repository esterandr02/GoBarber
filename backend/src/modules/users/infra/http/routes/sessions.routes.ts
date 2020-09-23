import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();

const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
    sessionController.create,
);

export default sessionsRouter;
