import { Router } from "express";
import { getWorks, postWork, putWorks, deleteWork } from "../controllers/works";

const worksRouter = Router();

worksRouter.get("/", getWorks);
worksRouter.post("/new", postWork);
worksRouter.delete("/:id", deleteWork);
worksRouter.put("/:id", putWorks);

export default worksRouter;
