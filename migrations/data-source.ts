import config from "config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const postgresConfig = config.get<any>("db");

const connectionOptions: DataSourceOptions = {
  ...postgresConfig,
  username: postgresConfig.user,
  synchronize: false,
  logging: false,
  migrations: ["./migrations/history/*.ts"],
  subscribers: [],
};

export const AppDataSource = new DataSource(connectionOptions);