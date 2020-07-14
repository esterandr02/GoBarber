import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });
        return findAppointment || null;
    }
}
// O typeORM ja possui metodos basicos para criar, listar, deletar, etc

export default AppointmentsRepository;
