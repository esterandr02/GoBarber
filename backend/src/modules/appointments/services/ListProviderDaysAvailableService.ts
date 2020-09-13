import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderDaysAvaiableService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findDaysAvailableInMonth(
            {
                provider_id,
                month,
                year,
            },
        );
        const daysInMonth = getDaysInMonth(new Date(year, month - 1));

        const daysArray = Array.from(
            {
                length: daysInMonth,
            },
            (value, index) => index + 1,
        );

        const availability = daysArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date);
            });

            return {
                day,
                available: appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}
