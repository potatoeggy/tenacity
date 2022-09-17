import { useState } from "react"

export function FilePicker() {
    const [file, setFile] = useState<File>()

    function onFileChange(event: any) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event: any) {
        if (!file) return;
        event.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        formData.append("filename", file.name)

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Select an audio or video file!</h2>
            <input type="file" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
    )
}