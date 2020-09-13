// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDaysAvailableService from './ListProviderDaysAvailableService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDaysAvailable: ListProviderDaysAvailableService;

describe('listProviderDaysAvaiable', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDaysAvailable = new ListProviderDaysAvailableService(
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
            date: new Date(2020, 4, 21, 9, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 11, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 12, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 13, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 15, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 16, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2020, 4, 21, 17, 0, 0),
        });

        const avaiability = await listProviderDaysAvailable.execute({
            provider_id: 'provider_id',
            month: 5,
            year: 2020,
        });

        expect(avaiability).toEqual(
            expect.arrayContaining([{ day: 21, available: false }]),
        );
    });
});
