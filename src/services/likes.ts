import { UserLikes } from "../models/UserLikes";
import { HttpError } from "../utils/HttpError";
import { getUser } from "./user";

export async function addLikeToDb(workId: number, email: string) {
  const user = await getUser(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  return await UserLikes.create({
    workId,
    userId: user.id,
  });
}

export async function deleteLikeFromDb(workId: number, email: string) {
  const user = await getUser(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  return await UserLikes.destroy({
    where: {
      workId,
      userId: user.id,
    },
  });
}
