import axios from "axios";
const API_ENDPOINT = "https://api.assemblyai.com/v2";

export function getUploadUrlAxios(file: File) {
  console.log("env", import.meta.env.VITE_AI_API_KEY);
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
  const { upload_url }: Record<string, string> = await assembly.post(
    "/upload",
    file
  );

  console.log("url", upload_url);

  const assemblyTrans = getTranscriptAxios(upload_url);
  const res: Record<string, any> = assemblyTrans.post("/transcript", {
    audio_url: upload_url,
  });
  console.log(res);
  return;
}
