import { getSequelize } from "../libs/sequelize";
import { Objects } from "../models/Objects";
import { Works } from "../models/Works";

import Queue from "bull";

export const createWorkQueue = new Queue("create work");

createWorkQueue.process(async (job) => {
  const { requestBody } = job.data;

  const sequelize = await getSequelize();
  const transaction = await sequelize.transaction();

  try {
    const { name, views = 0, image, description, object } = requestBody;
    const work = await Works.create({ name, views, image, description }, { transaction });
    await Objects.create(
      {
        workId: work.id,
        object,
      },
      { transaction },
    );

    await transaction.commit();
    return work;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
});

type RequestBody = {
  name: string;
  views: number;
  image: string;
  description: string;
  object: Record<string, unknown>;
};

export async function createWork(requestBody: RequestBody) {
  createWorkQueue.add({ requestBody });
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
