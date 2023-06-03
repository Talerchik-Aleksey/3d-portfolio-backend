import { Request, Response } from "express";
import { HttpError } from "./HttpError";

export function errorResponse(req: Request, res: Response, err: unknown) {
  const { message } = err as Error;
  const status = err instanceof HttpError ? (err as HttpError).httpCode : 500;
  res.status(status).json({ status, error: { message } });
}
