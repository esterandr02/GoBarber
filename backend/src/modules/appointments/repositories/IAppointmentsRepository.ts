import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import IListProviderDaysAvailableDTO from '../dtos/IListProviderDaysAvailableDTO';
import IListProviderHoursAvailableDTO from '../dtos/IListProviderHoursAvailableDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findDaysAvailableInMonth(
        data: IListProviderDaysAvailableDTO,
    ): Promise<Appointment[]>;
    findHoursAvailableInDay(
        data: IListProviderHoursAvailableDTO,
    ): Promise<Appointment[]>;
}
