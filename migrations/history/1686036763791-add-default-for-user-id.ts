import { MigrationInterface, QueryRunner } from "typeorm";

const TABLE_NAME = "users";

export class AddDefaultForUserId1686036763791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${TABLE_NAME} ALTER COLUMN id SET DEFAULT uuid_generate_v4()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
