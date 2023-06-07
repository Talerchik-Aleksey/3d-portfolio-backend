const { parentPort, workerData } = require("worker_threads");
const { Objects } = require("./src/models/Objects");

Objects.create({
  workId: workerData.workId,
  object: workerData.object,
})
  .then(() => parentPort.postMessage("done"))
  .catch((error) => parentPort.postMessage({ error }));
