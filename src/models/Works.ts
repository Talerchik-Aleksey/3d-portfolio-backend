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
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "works",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Works extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Default(0)
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
