import { Router } from "express";
import { getWorks, postWork, putWorks, deleteWork, getObject } from "../controllers/works";

const worksRouter = Router();

worksRouter.get("/", getWorks);
worksRouter.get("/:id/object", getObject);
worksRouter.post("/new", postWork);
worksRouter.delete("/:id", deleteWork);
worksRouter.put("/:id", putWorks);

export default worksRouter;
