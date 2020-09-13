import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointments = container.resolve(CreateAppointmentsService);

        const appointment = await createAppointments.execute({
            provider_id,
            date: parsedDate,
        });
        return response.json(appointment);
    }
}
