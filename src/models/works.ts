import {
  Model,
  Column,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  Default,
  AllowNull,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  tableName: "histories_decisions",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Works extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  @AutoIncrement
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  views!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  object!: Record<string, unknown>;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;
}
