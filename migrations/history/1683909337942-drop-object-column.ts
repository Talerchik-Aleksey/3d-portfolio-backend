import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME = "works";
const COLUMN_NAME = "object";

export class DropObjectColumn1683909337942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TABLE_NAME, COLUMN_NAME);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TABLE_NAME,
      new TableColumn({
        name: "object",
        type: "jsonb",
        isNullable: false,
      }),
    );
  }
}
