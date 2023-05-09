import express, { json } from "express";
import config from "config";
import helmet from "helmet";
import { connect } from "./libs/sequelize";
import { logger } from "./libs/logger";

const app = express();

async function startServer() {
  try {
    await connect();
    app.use(json());
    app.use(helmet());

    app.use("/api/3d-data", routes);

    const port = config.get<number>("server.port") || 3005;

    app.listen(port, () => {
      logger.info(`3D work's microservice started on port ${port}`);
    });
  } catch (error) {
    logger.error({ message: "Error in starting history server", error: error });
  }
}

startServer();

export default app;
