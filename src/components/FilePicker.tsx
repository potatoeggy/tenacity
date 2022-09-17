import axios from "axios";
import { useState } from "react";
import { uploadFile } from "../utils/api";

export function FilePicker() {
  const [file, setFile] = useState<File>();

  async function onFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event: any) {
    if (!file) return;
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);

    await uploadFile(file);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select an audio or video file!</h2>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
