import { Router } from "express";
import { getWorks, postWork, putWorks } from "../controllers/works";

const worksRouter = Router();

worksRouter.get("/", getWorks);
worksRouter.post("/new", postWork);
worksRouter.put("/:id", putWorks);

export default worksRouter;
