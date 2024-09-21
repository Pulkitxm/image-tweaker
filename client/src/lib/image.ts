import axios from "axios";
import { validateImageFetch } from "../schem/image";
import { BACKEND_URL } from "./constants";

export async function getAllImages() {
  const resp = await axios.get(BACKEND_URL + "/api/image", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const parsedResp = validateImageFetch.safeParse(resp.data);
  if (!parsedResp.success) {
    return [];
  }
  return parsedResp.data;
}

export async function getImage(id: string) {
  const resp = await axios.get(BACKEND_URL + `/api/image/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    responseType: "blob",
  });
  return URL.createObjectURL(resp.data);
}

export async function getImageDetails(id: string) {
  const resp = await axios.get(BACKEND_URL + `/api/image/${id}/details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return resp.data;
}

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(BACKEND_URL + "/api/image", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteImage(id: string) {
  return axios.delete(BACKEND_URL + `/api/image/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function getImagePrivacy(id: string) {
  const res = await axios.get(BACKEND_URL + `/api/image/privacy/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data.isPublic === true;
}

export function updateImagePrivacy(id: string, isPublic: boolean) {
  return axios.patch(
    BACKEND_URL + `/api/image/privacy/${id}`,
    { isPublic },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}
