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
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('Should not be able to create two appointments at the same date', async () => {
        await createAppointments.execute({
            date: new Date(),
            provider_id: '123123123',
        });

        await expect(
            createAppointments.execute({
                date: new Date(),
                provider_id: '123123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
