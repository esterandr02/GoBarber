// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderHoursAvailableInDayService from './ListProviderHoursAvailableInDayService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderHoursAvailableInDay: ListProviderHoursAvailableInDayService;

describe('listProviderHoursAvaiable', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderHoursAvailableInDay = new ListProviderHoursAvailableInDayService(
            fakeAppointmentsRepository,
        );
    });

    it("Should be able to show provider's avaiable days in a specific month", async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 10, 0, 0),
        });

        const avaiability = await listProviderHoursAvailableInDay.execute({
            provider_id: 'provider_id',
            day: 21,
            month: 5,
            year: 2020,
        });

        expect(avaiability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: true },
                { hour: 10, available: false },
                { hour: 11, available: true },
            ]),
        );
    });
});
