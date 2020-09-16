import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class ProviderDaysAvailableInDayController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.query;

        const listProviderMonthAvailability = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const availability = await listProviderMonthAvailability.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}
