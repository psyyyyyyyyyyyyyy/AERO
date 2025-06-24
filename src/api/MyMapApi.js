import { APIService } from "./axios.js";

export async function uploadTravelLog({ address, content, file }) {
  const formData = new FormData();
  formData.append("image", file);

  const query = `?address=${encodeURIComponent(address)}&content=${encodeURIComponent(content)}`;

  const response = await APIService.private.post(`/api/travel-logs/upload${query}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function fetchTravelLogs() {
  return await APIService.private.get("/api/travel-logs");
}

export async function deleteTravelLog(id) {
  const response = await APIService.private.delete(`/api/travel-logs/${id}`);
  return response;
}


