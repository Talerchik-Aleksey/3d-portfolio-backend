import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME = "users";

export class ChangeMaxForUser1686035843755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      TABLE_NAME,
      "login",
      new TableColumn({
        name: "login",
        type: "varchar",
        length: "255",
        isNullable: false,
      }),
    );
    await queryRunner.changeColumn(
      TABLE_NAME,
      "password",
      new TableColumn({
        name: "password",
        type: "varchar",
        length: "255",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
