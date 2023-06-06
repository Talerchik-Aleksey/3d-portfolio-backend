import { getSequelize } from "../libs/sequelize";
import { Objects } from "../models/Objects";
import { Works } from "../models/Works";

import { logger } from "../libs/logger";

type RequestBody = {
  name: string;
  views: number;
  image: string;
  description: string;
  object: Record<string, unknown>;
};

export async function createWork(requestBody: RequestBody) {
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
    ).catch((e) => logger.error(e));

    await transaction.commit();
    logger.info(`Work ${work.id} created`);
    return work;
  } catch (error) {
    logger.error(error);
    transaction.rollback();
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
