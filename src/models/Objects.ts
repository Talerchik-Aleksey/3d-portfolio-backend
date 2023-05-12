import {
  Model,
  Column,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Works } from "./Works";

@Table({
  tableName: "objects",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Objects extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  object!: Record<string, unknown>;

  @ForeignKey(() => Works)
  @Column(DataType.INTEGER)
  worksId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;

  @BelongsTo(() => Works)
  works!: Works;
}
