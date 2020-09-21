import { Router } from 'express';

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
    listProviderMonthAvailabilityController.index,
);

providersRouter.get(
    '/:provider_id/day-availability',
    listProviderDayAvailabilityController.index,
);

providersRouter.get('/schedule', listProviderAppointmentsController.index);

export default providersRouter;
