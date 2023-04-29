import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Example1637918580844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'example',
      new TableColumn({
        name: 'new_column',
        type: 'text',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('example', 'new_column')
  }
}
