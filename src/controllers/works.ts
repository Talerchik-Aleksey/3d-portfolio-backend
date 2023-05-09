import { Request, Response } from "express";

export async function getWorks(req: Request, res: Response) {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({});
  }
}

export async function postWork(req: Request, res: Response) {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({});
  }
}

export async function putWorks(req: Request, res: Response) {
  try {
    const { id } = req.params;
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({});
  }
}
