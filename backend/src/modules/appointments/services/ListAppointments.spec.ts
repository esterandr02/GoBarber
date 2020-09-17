// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListAppointmentsService from './ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointments: ListAppointmentsService;

describe('listAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listAppointments = new ListAppointmentsService(
            fakeAppointmentsRepository,
        );

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 21, 11).getTime();
        });
    });

    it('Should be able to show all appointments providers', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id_1',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 12),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id_2',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 13),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id_3',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 17),
        });

        const appointments = await listAppointments.execute();

        expect(appointments[0]).toHaveProperty('id');
        expect(appointments[1]).toHaveProperty('id');
        expect(appointments[2]).toHaveProperty('id');
    });
});
