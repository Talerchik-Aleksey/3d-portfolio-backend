import { Request, Response } from "express";
import { logger } from "../libs/logger";
import {
  createWork,
  getWorksFromDb,
  updateWork,
  deleteWorkFromDb,
  getObjectFromDb,
  getWorkFromDb,
  addViewsForWork,
} from "../services/works";
import { errorResponse } from "../utils/errorResponse";
import { successResponse } from "../utils/successRespons";

export async function postWork(req: Request, res: Response) {
  try {
    const work = await createWork(req.body);
    res.status(200).send(work);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}

export async function getWorks(req: Request, res: Response) {
  try {
    const works = await getWorksFromDb();
    res.status(200).send(works);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}

export async function getWork(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const work = await getWorkFromDb(+id);
    res.status(200).send(work);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}

export async function getObject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    logger.info(id);
    const work = await getObjectFromDb(+id);
    res.status(200).send(work);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}

export async function putWorks(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const work = await updateWork(+id, req.body);
    res.status(200).send(work);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}

export async function deleteWork(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const work = await deleteWorkFromDb(+id);
    successResponse(req, res, work);
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function addViews(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const work = await addViewsForWork(+id);
    res.status(200).send(work);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}
