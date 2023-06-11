import { Dropbox } from "dropbox";
import fetch from "isomorphic-fetch";
import dotenv from "dotenv";

dotenv.config();

const appKey = process.env.DROPBOX_APP_KEY;
const appSecret = process.env.DROPBOX_APP_SECRET;

const dbx = new Dropbox({
  clientId: appKey,
  clientSecret: appSecret,
  fetch,
});

export async function uploadFile(file: any, name: string) {
  const res = await dbx.filesUpload({
    path: `/3d-protfolio/${name}.glb`,
    contents: file,
  });
  return res;
}

export async function downloadFile(name: string | number) {
  const result = await dbx.filesDownload({ path: `/3d-protfolio/${name}.glb` });
  return result;
}
