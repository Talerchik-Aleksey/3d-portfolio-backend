import { Router } from "express";
import { getWorks, postWork, putWorks, deleteWork, getObject, getWork } from "../controllers/works";

const worksRouter = Router();

worksRouter.get("/", getWorks);
worksRouter.get("/:id/object", getObject);
worksRouter.get("/:id", getWork);
worksRouter.post("/new", postWork);
worksRouter.delete("/:id", deleteWork);
worksRouter.put("/:id", putWorks);

export default worksRouter;
