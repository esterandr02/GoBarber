import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersControllers';
import ListProviderMonthAvailabilityController from '../controllers/ListProviderMonthAvailabilityController';
import ListProviderDayAvailabilityController from '../controllers/ListProviderDayAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const listProviderMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const listProviderDayAvailabilityController = new ListProviderDayAvailabilityController();

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

export default providersRouter;
