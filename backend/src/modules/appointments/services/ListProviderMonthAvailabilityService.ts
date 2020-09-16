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
export default class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllDaysInMonth(
            {
                provider_id,
                month,
                year,
            },
        );

        const daysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            {
                length: daysInMonth,
            },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const hasAppointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: hasAppointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}
