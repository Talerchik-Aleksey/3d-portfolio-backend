import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME = "user_likes";

export class UseDefaultGenerated1687893148248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      TABLE_NAME,
      "id",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      TABLE_NAME,
      "id",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
      }),
    );
  }
}
