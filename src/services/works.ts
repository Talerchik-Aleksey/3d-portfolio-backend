import { Works } from "../models/Works";

type RequestBody = {
  name: string;
  views: number;
  image: string;
  description: string;
  object: Record<string, unknown>;
};

export async function getWorksFromDb() {
  const works = await Works.findAll();
  return works;
}

export async function createWork(requestBody: RequestBody) {
  const work = await Works.create(requestBody);
  return work;
}

export async function updateWork(id: number, requestBody: RequestBody) {
  const work = await Works.update(requestBody, { where: { id } });
  return work;
}
