import { getSequelize } from "../libs/sequelize";
import { Works } from "../models/Works";

import { logger } from "../libs/logger";
import { downloadFile, uploadFile } from "../libs/dropbox";
import { getUser } from "./user";
import { Comments } from "../models/Comments";
import { HttpError } from "../utils/HttpError";
import { Users } from "../models/Users";
import { UserLikes } from "../models/UserLikes";

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

    const res = await uploadFile(object, work.id);
    logger.info(res);

    transaction.commit();
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
  const works = await Works.findAll({
    include: [{ model: UserLikes, include: [{ model: Users }] }],
    order: [["createdAt", "DESC"]],
  });
  return works;
}

export async function getWorkFromDb(id: number) {
  const work = await Works.findOne({
    where: { id },
    include: [
      {
        model: Comments,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Users,
          },
        ],
      },
    ],
    order: [
      ["comments", "createdAt", "DESC"],
      ["createdAt", "DESC"],
    ],
  });

  const userLikesCount = await UserLikes.count({
    where: { workId: id },
  });
  return { work, userLikesCount };
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
  try {
    const res: any = await downloadFile(id);
    return res.result.fileBinary;
  } catch (error) {
    logger.error(error);
  }
}

export async function addViewsForWork(id: number) {
  const work = await Works.findOne({ where: { id } });
  if (!work) {
    return;
  }
  work.views += 1;
  await work.save();
}

export async function createComment(email: string, comment: string, workId: number) {
  try {
    const user = await getUser(email);
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const createdComment = await Comments.create({ userId: user.id, comment, workId });
    createdComment.dataValues.login = user.login;
    return createdComment;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
