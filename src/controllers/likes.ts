import { Request, Response } from "express";
import { addLikeToDb, deleteLikeFromDb } from "../services/likes";
import { errorResponse } from "../utils/errorResponse";
import { successResponse } from "../utils/successRespons";

export async function removeLike(req: Request, res: Response) {
  try {
    const { workId, email } = req.body;
    const like = await deleteLikeFromDb(+workId, email);
    successResponse(req, res, like);
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function addLike(req: Request, res: Response) {
  try {
    const { workId, email } = req.body;

    const like = await addLikeToDb(+workId, email);

    successResponse(req, res, like);
  } catch (error) {
    errorResponse(req, res, error);
  }
}
