import { useState } from "react";
import axios from "axios";

function FileUpload({ endpoint }) {

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const API = "http://localhost:8000";

  const handleUpload = async () => {

    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post(
        `${API}/${endpoint}`,
        formData
      );

      setResponse(res.data);

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    }
  };

  return (

    <div>

      <input
        type="file"
        accept=".pdf"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Paper
      </button>

      {response && (
        <pre>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}

    </div>

  );
}

export default FileUpload;