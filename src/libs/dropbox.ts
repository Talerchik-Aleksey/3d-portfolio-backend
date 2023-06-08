import { Dropbox } from "dropbox";
import fetch from "isomorphic-fetch";

const dbx = new Dropbox({
  accessToken:
    "sl.Bf8D2tOeXb2ef6uw2DwDV_WATcYriwh3QgqHCNZUeLLuSxW8ylMfdwZk0FwGvB7wP7_UKAIHoSybCY-FSSojhqTRdJfDI-hQ0X3gQECo4VNnxyDiRHsCfiE5lZmEfxLByHv_SrIHx4lr",
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
