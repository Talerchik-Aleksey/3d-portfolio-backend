import { Router } from "express";
import { addLike, removeLike } from "../controllers/likes";
import {
  getWorks,
  postWork,
  putWorks,
  deleteWork,
  getObject,
  getWork,
  addViews,
  postComments,
} from "../controllers/works";

const worksRouter = Router();

worksRouter.get("/", getWorks);

worksRouter.post("/comments", postComments);

worksRouter.post("/like", addLike);
worksRouter.delete("/like", removeLike);

worksRouter.get("/:id/object", getObject);

worksRouter.get("/:id", getWork);
worksRouter.post("/new", postWork);
worksRouter.delete("/:id", deleteWork);
worksRouter.put("/:id/views", addViews);
worksRouter.put("/:id", putWorks);

export default worksRouter;
