import { Dropbox } from "dropbox";
import fetch from "isomorphic-fetch";
import dotenv from "dotenv";

dotenv.config();

const dbx = new Dropbox({
  customHeaders: {
    Authorization: `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
  },
  fetch,
});

// Now you can use dbx to interact with Dropbox...
//
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
