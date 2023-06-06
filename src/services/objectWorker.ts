import { parentPort, workerData } from "worker_threads";
import { Objects } from "../models/Objects";

Objects.create({
  workId: workerData.workId,
  object: workerData.object,
})
  .then(() => parentPort?.postMessage("done"))
  .catch((error) => parentPort?.postMessage({ error }));
