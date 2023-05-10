import { Sequelize } from "sequelize-typescript";
import { Dialect, PoolOptions } from "sequelize";
import config from "config";
import { logger } from "./logger";

export type ConnectionOptionsType = {
  type?: Dialect;
  dialect?: Dialect;
  host: string;
  port?: string | number;
  database: string;
  user: string;
  password: string;
  pool?: PoolOptions;
};

let sequelize: Sequelize | undefined = undefined;

export async function connect() {
  try {
    const options = config.get<ConnectionOptionsType>("db");
    logger.info(options, "options");

    sequelize = new Sequelize({
      dialect: options.dialect || options.type || "postgres",
      host: options.host,
      database: options.database,
      username: options.user,
      password: options.password,
      pool: options.pool,
      models: [`${__dirname}/../models`],
    });

    await sequelize.authenticate();
  } catch (error) {
    logger.error(error);
  }
}

export async function getSequelize(): Promise<Sequelize> {
  if (!sequelize) {
    await connect();
  }

  return sequelize!;
}
