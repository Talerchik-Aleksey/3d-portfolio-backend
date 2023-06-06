import { getSequelize } from "../libs/sequelize";
import { Objects } from "../models/Objects";
import { Works } from "../models/Works";
import { Worker } from "worker_threads";

import { logger } from "../libs/logger";

type RequestBody = {
  name: string;
  views: number;
  image: string;
  description: string;
  object: Record<string, unknown>;
};

async function retryOnFail<T>(
  operation: () => Promise<T>,
  retries: number,
  delay: number,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return retryOnFail(operation, retries - 1, delay);
    } else {
      throw error;
    }
  }
}

export async function createWork(requestBody: RequestBody) {
  // Re-use database connection
  const sequelize = await getSequelize();
  const transaction = await sequelize.transaction();

  try {
    const { name, views = 0, image, description, object } = requestBody;

    // Create Work and Object in parallel
    const workPromise = Works.create({ name, views, image, description }, { transaction });
    const work = await workPromise;
    const worker = new Worker("./objectWorker.ts", { workerData: { workId: work.id, object } });
    worker.on("message", async () => {
      await retryOnFail(() => transaction.commit(), 3, 2000);
      console.log(`Work ${work.id} created`);
    });

    worker.on("error", (error) => {
      console.error(error);
      retryOnFail(() => transaction.rollback(), 3, 2000);
    });

    worker.on("exit", (code) => {
      if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
    });

    return work;
  } catch (error) {
    logger.error(error);

    // Rollback transaction if it exists
    if (transaction) {
      await transaction.rollback();
    }

    throw error;
  }
}

export async function getWorksFromDb() {
  const works = await Works.findAll({ order: [["createdAt", "DESC"]] });
  return works;
}

export async function getWorkFromDb(id: number) {
  const work = await Works.findOne({ where: { id } });
  return work;
}

export async function updateWork(id: number, requestBody: RequestBody) {
  const work = await Works.update(requestBody, { where: { id } });
  return work;
}

export async function deleteWorkFromDb(id: number) {
  const work = await Works.destroy({ where: { id } });
  await Objects.destroy({ where: { workId: id } });
  return work;
}

export async function getObjectFromDb(id: number) {
  const work = await Objects.findOne({ where: { workId: id } });
  if (!work) {
    return null;
  }
  return work.object;
}

export async function addViewsForWork(id: number) {
  const work = await Works.findOne({ where: { id } });
  if (!work) {
    return;
  }
  work.views += 1;
  await work.save();
}
