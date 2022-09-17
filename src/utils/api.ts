import axios from "axios";
const API_ENDPOINT = "https://api.assemblyai.com/v2";

export function getUploadUrlAxios(file: File) {
  return axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      "content-type": "application/json",
      authorization: import.meta.env.VITE_AI_API_KEY,
      "transfer-encoding": "chunked",
    },
  });
}

export function getTranscriptAxios(uploadUrl: string) {
  return axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      authorization: import.meta.env.VITE_AI_API_KEY,
      "content-type": "application/json",
    },
  });
}

export async function uploadFile(file: File) {
  const assembly = getUploadUrlAxios(file);
  const {
    data: { upload_url },
  }: Record<string, any> = await assembly.post("/upload", file);
  const assemblyTrans = getTranscriptAxios(upload_url);
  const res: Record<string, any> = await assemblyTrans.post("/transcript", {
    audio_url: upload_url,
    disfluencies: true,
    language_detection: true,
    content_safety: true,
    iab_categories: true,
    sentiment_analysis: true,
    entity_detection: true
  });
  return res.data;
}
