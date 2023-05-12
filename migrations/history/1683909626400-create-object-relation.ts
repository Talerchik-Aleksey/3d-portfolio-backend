import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME = "objects";
const COLUMN_CREATED_AT = "created_at";
const COLUMN_UPDATED_AT = "updated_at";
const COLUMN_DELETED_AT = "deleted_at";

export class CreateObjectRelation1683909626400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "object",
            type: "jsonb",
            isNullable: false,
          },
          {
            name: "work_id",
            type: "integer",
          },
          {
            name: COLUMN_CREATED_AT,
            type: "timestamp with time zone",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
            comment: "The timestamp when the history was created",
          },
          {
            name: COLUMN_UPDATED_AT,
            type: "timestamp with time zone",
            isNullable: true,
            default: "CURRENT_TIMESTAMP",
            comment: "The timestamp when the history was last updated",
          },
          {
            name: COLUMN_DELETED_AT,
            type: "timestamp with time zone",
            isNullable: true,
            comment: "The timestamp when the history was deleted",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
