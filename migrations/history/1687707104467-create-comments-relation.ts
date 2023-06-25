import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME = "comments";

export class CreateCommentsRelation1687707104467 implements MigrationInterface {
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
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "work_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "comment",
            type: "text",
            isNullable: false,
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

    await queryRunner.createForeignKeys(TABLE_NAME, [
      new TableForeignKey({
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        referencedTableName: "users",
      }),
      new TableForeignKey({
        referencedColumnNames: ["id"],
        columnNames: ["work_id"],
        referencedTableName: "works",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
