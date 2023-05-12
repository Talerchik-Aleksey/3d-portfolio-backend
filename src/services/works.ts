import { Objects } from "../models/Objects";
import { Works } from "../models/Works";

type RequestBody = {
  name: string;
  views: number;
  image: string;
  description: string;
  object: Record<string, unknown>;
};

export async function createWork(requestBody: RequestBody) {
  const { name, views, image, description, object } = requestBody;
  const work = await Works.create({ name, views, image, description, object });
  await Objects.create({
    worksId: work.id,
    object,
  });
  return work;
}

export async function getWorksFromDb() {
  const works = await Works.findAll();
  return works;
}

export async function updateWork(id: number, requestBody: RequestBody) {
  const work = await Works.update(requestBody, { where: { id } });
  return work;
}

export async function deleteWorkFromDb(id: number) {
  const work = await Works.destroy({ where: { id } });
  return work;
}

export async function getObjectFromDb(id: number) {
  const work = await Objects.findOne({ where: { wroksId: id } });
  return work;
}
