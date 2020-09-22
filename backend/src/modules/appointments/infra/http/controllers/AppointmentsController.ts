import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointments = container.resolve(CreateAppointmentsService);

        const appointment = await createAppointments.execute({
            provider_id,
            user_id,
            date: parsedDate,
        });
        return response.json(appointment);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listAppointments = container.resolve(ListAppointmentsService);

        const appointments = await listAppointments.execute();

        return response.json(appointments);
    }
}
