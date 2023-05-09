import { Request, Response } from "express";
import { logger } from "../libs/logger";
import { createWork, getWorksFromDb, updateWork } from "../services/works";

export async function getWorks(req: Request, res: Response) {
  try {
    const works = await getWorksFromDb();
    res.status(200).send(works);
  } catch (error) {
    logger.error(error);
    res.status(500).json({});
  }
}

export async function postWork(req: Request, res: Response) {
  try {
    const work = await createWork(req.body);
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
