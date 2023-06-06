import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import { connect } from "./libs/sequelize";
import { logger } from "./libs/logger";
import cors from "cors";
import worksRouter from "./routes/works";
import compression from "compression";
import userRouter from "./routes/user";
import { pinoHttp } from "pino-http";

const app = express();

async function startServer() {
  try {
    await connect();
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb" }));
    app.use(cors());
    app.use(
      pinoHttp({
        logger,
      }),
    );
    app.use(compression());

    app.use("/api/3d-data", worksRouter);
    app.use("/api/user", userRouter);

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
