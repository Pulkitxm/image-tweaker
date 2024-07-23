import axios from "axios";
import { validateImageFetch } from "../schem/image";
import { BACKEND_URL } from "./constants";

export async function getAllImages() {
  const resp = await axios.get(BACKEND_URL + "/api/image", {
    withCredentials: true,
  });
  const parsedResp = validateImageFetch.safeParse(resp.data);
  if (!parsedResp.success) {
    return [];
  }
  return parsedResp.data;
}

export async function getImage(id: string) {
  const resp = await axios.get(BACKEND_URL + `/api/image/${id}`, {
    withCredentials: true,
    responseType: "blob",
  });
  return URL.createObjectURL(resp.data);
}

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(BACKEND_URL + "/api/image", formData, {
    withCredentials: true,
  });
}

export function deleteImage(id: string) {
  return axios.delete(BACKEND_URL + `/api/image/${id}`, {
    withCredentials: true,
  });
}

export async function getImagePrivacy(id: string) {
  const res = await axios.get(BACKEND_URL + `/api/image/privacy/${id}`, {
    withCredentials: true,
  });
  return res.data.isPublic === true;
}

export function updateImagePrivacy(id: string, isPublic: boolean) {
  return axios.patch(
    BACKEND_URL + `/api/image/privacy/${id}`,
    { isPublic },
    {
      withCredentials: true,
    }
  );
}
