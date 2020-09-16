// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('listProviderHoursAvaiable', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it("Should be able to show provider's avaiable hours in a specific day", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 21, 11).getTime();
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 15, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 4, 21, 17, 0, 0),
        });

        const avaiability = await listProviderDayAvailability.execute({
            provider_id: 'provider_id',
            day: 21,
            month: 5,
            year: 2020,
        });

        expect(avaiability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 11, available: false },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
                { hour: 17, available: false },
            ]),
        );
    });
});
