import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderToProviderID1589583394420
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider'); // deletar coluna

        await queryRunner.addColumn(
            // adicionar nova coluna
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            // criar um relacionamento entre tabelas
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'], // nome da coluna na aplicacao
                referencedColumnNames: ['id'], // nome da coluna no Banco
                referencedTableName: 'users', // tabela a se relacionar
                onDelete: 'SET NULL', // deixar nulo o id do provider em seus relacionamentos (serao mantidos)
                onUpdate: 'CASCADE', // caso haja uma atualizacao no id do provider, isso ira se refletir para seus relacoinamentos
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // reverter de tras pra frente a tabela criada acima
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
