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
import { Users } from "./Users";
import { Works } from "./Works";

@Table({
  tableName: "user_likes",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class UserLikes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string;

  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column(DataType.STRING)
  userId!: string;

  @AllowNull(false)
  @ForeignKey(() => Works)
  @Column(DataType.INTEGER)
  workId!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;

  @BelongsTo(() => Users)
  user!: Users;

  @BelongsTo(() => Works)
  work!: Works;
}
