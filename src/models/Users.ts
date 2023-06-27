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
  HasMany,
} from "sequelize-typescript";
import { Comments } from "./Comments";
import { UserLikes } from "./UserLikes";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  login!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;

  @HasMany(() => Comments)
  comments!: Comments[];

  @HasMany(() => UserLikes)
  userLikes!: UserLikes[];
}
