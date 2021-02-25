import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class init1614168775111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'token_id',
            type: 'varchar',
            length: '78',
            isPrimary: true,
          },
          {
            name: 'image',
            type: 'text',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token');
  }
}
