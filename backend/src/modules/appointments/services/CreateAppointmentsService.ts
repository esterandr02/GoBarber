import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
export default class CreateAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        user_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked.');
        }

        if (user_id === provider_id) {
            throw new AppError(
                'Cannot create an appointment with same provider as user.',
            );
        }

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError('Cannot create an appointment in a past date.');
        }

        const time = getHours(appointmentDate);

        if (time < 8 || time > 17) {
            throw new AppError(
                'Cannot create an appointment before 8am and after 5pm.',
            );
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}
