import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentsService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointments: CreateAppointmentsService;

describe('CreateAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointments = new CreateAppointmentsService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
        );

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 21, 11).getTime();
        });
    });

    it('Should be able to create a new appointment', async () => {
        const appointment = await createAppointments.execute({
            date: new Date(2020, 4, 21, 12),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment).toHaveProperty('user_id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('Should not be able to create two appointments at the same date', async () => {
        await createAppointments.execute({
            date: new Date(2020, 4, 21, 12),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(
            createAppointments.execute({
                date: new Date(2020, 4, 21, 12),
                provider_id: 'uprovider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create an appointment in a past date', async () => {
        await expect(
            createAppointments.execute({
                date: new Date(2020, 4, 21, 8),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create an appointment with same provider as user', async () => {
        await expect(
            createAppointments.execute({
                date: new Date(2020, 4, 21, 13),
                provider_id: 'user_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create an appointment before 8am and after 5pm', async () => {
        await expect(
            createAppointments.execute({
                date: new Date(2020, 4, 21, 7),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointments.execute({
                date: new Date(2020, 4, 21, 18),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
