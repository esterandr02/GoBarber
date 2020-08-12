import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments') // Entidade na tabela
class Appointment {
    @PrimaryGeneratedColumn('uuid') // id do agendamento
    id: string;

    @Column()
    provider_id: string; // id do prestador de servico desse agendamento

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
// Nao e necessario mais um constructor, pois ja ha uma relacao de criacao no banco
// Nao e necessario ter uma inicializacao dos models

export default Appointment;
