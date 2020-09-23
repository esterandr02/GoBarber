import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersControllers';
import ListProviderMonthAvailabilityController from '../controllers/ListProviderMonthAvailabilityController';
import ListProviderDayAvailabilityController from '../controllers/ListProviderDayAvailabilityController';
import ListProviderAppointmentsController from '../controllers/ListProviderAppointmentsController';

const providersRouter = Router();

const providersController = new ProvidersController();
const listProviderMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const listProviderDayAvailabilityController = new ListProviderDayAvailabilityController();
const listProviderAppointmentsController = new ListProviderAppointmentsController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
        [Segments.QUERY]: {
            month: Joi.number().integer().min(1).max(12).required(),
            year: Joi.number().required().integer(),
        },
    }),
    listProviderMonthAvailabilityController.index,
);

providersRouter.get(
    '/:provider_id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
        [Segments.QUERY]: {
            day: Joi.number().integer().min(1).max(31).required(),
            month: Joi.number().integer().min(1).max(12).required(),
            year: Joi.number().required().integer(),
        },
    }),
    listProviderDayAvailabilityController.index,
);

providersRouter.get(
    '/schedule',
    celebrate({
        [Segments.QUERY]: {
            day: Joi.number().integer().min(1).max(31).required(),
            month: Joi.number().integer().min(1).max(12).required(),
            year: Joi.number().required().integer(),
        },
    }),
    listProviderAppointmentsController.index,
);

export default providersRouter;
