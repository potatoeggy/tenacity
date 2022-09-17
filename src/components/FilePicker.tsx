import { useState } from "react";
import { uploadFile } from "../utils/api";
import { useHistory } from "react-router-dom";
import './components.css';

export function FilePicker() {
  const history = useHistory();
  const [file, setFile] = useState<File>();
  const [submitted, setSubmitted] = useState<boolean>(false)


  async function onFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event: any) {
    if (!file) return;
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);

    setSubmitted(true)
    const data = await uploadFile(file);
    history.push(`/view?id=${data.id}&size=${file.size}`);
  }
  const acceptedFormats = ".3ga, .8svx, .aac, .ac3, .aif, .aiff, .alac, .amr, .ape, .au, .dss, .flac, .flv, .m4a, .m4b, .m4p, .m4r, .mp3, .mpga, .ogg, .oga, .mogg, .opus, .qcp, .tta, .voc, .wav, .wma, .wv, .webm, .MTS, .M2TS, .TS, .mov, .mp2, .mp4, .m4p, .m4v, .mxf"

  return (
    <form onSubmit={handleSubmit}>
      <div className="header1">Select an audio or video file!</div>
      <label className="container2">
        <input type="file" style={{display:"none"}} accept={acceptedFormats} onChange={onFileChange}/>
        <div className="button2">Choose File</div>
        <div className="header2">Custom Upload</div>
        <button type="submit" className="button1" disabled={!file || submitted}>{submitted ? "Loading" : "Upload"}</button>
      </label>
     
    </form>
  );
}
