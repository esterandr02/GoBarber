import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import IListProviderDaysAvailableDTO from '../dtos/IListProviderDaysAvailableDTO';
import IListProviderHoursAvailableDTO from '../dtos/IListProviderHoursAvailableDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllDaysInMonth(
        data: IListProviderDaysAvailableDTO,
    ): Promise<Appointment[]>;
    findAllHoursInDay(
        data: IListProviderHoursAvailableDTO,
    ): Promise<Appointment[]>;
}
