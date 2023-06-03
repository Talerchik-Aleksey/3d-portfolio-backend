import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME = "users";

export class CreateUserRelation1685794907564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: "id",
            type: "uuid",
            isGenerated: true,
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "login",
            type: "varchar",
            isNullable: false,
            isUnique: true,
            length: "50",
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
