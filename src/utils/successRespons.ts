import { Request, Response } from "express";
import { HttpError } from "./HttpError";
import { logger } from "../libs/logger";

export function successResponse(req: Request, res: Response, data: any) {
  logger.info({ message: `Success response in ${req.method}: ${req.url}`, data });

  res.status(200).json({ status: "ok", data });
}

export function errorResponse(req: Request, res: Response, err: unknown) {
  logger.error({ message: `Error in ${req.method} ${req.url}`, error: err });

  const { message } = err as Error;
  const status = err instanceof HttpError ? (err as HttpError).httpCode : 500;

  res.status(status).json({ status: "error", error: { message } });
}
