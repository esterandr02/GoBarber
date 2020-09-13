import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderHoursAvaiableService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findHoursAvailableInDay(
            {
                provider_id,
                day,
                month,
                year,
            },
        );
        const hourStart = 8;

        const hoursArray = Array.from(
            {
                length: 10,
            },
            (value, index) => index + hourStart,
        );

        const availability = hoursArray.map(hour => {
            const appointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            return {
                hour,
                available: !appointmentInHour,
            };
        });

        return availability;
    }
}
