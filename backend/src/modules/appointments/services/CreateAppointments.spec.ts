import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointments: CreateAppointmentsService;

describe('CreateAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        createAppointments = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );
    });

    it('Should be able to create a new appointment', async () => {
        const appointment = await createAppointments.execute({
            date: new Date(),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment).toHaveProperty('user_id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('Should not be able to create two appointments at the same date', async () => {
        await createAppointments.execute({
            date: new Date(),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(
            createAppointments.execute({
                date: new Date(),
                provider_id: 'uprovider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
