import { useState } from "react";
import { FileUploadInput } from "src/features/fileUpload";
import { GenerateButton } from "src/features/generateButton";
import { LatexRender } from "src/features/latexRender";
import fileToBase64 from "src/utils/FileToBase64";
import generateLatexByBase64 from "src/utils/GenerateLatex";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [latex, setLatex] = useState<string>("");

  const handleGenerate = async () => {
    if (!file) {
      setError("Please upload a file");
      return;
    }
    const endpoint = import.meta.env.MODEL_ENDPOINT || "http://localhost:8005/v1/chat/completions";
    const model = "scottcfy/Qwen2-VL-2B-Instruct-pdf2latex"

    fileToBase64(file)
      .then(async (base64) => {
        // Call the API to generate LaTeX
        try {
          const latex = await generateLatexByBase64(base64, endpoint, model);
          // Do something with the generated LaTeX
          setLatex(latex);
        } catch (error:any) {
          setError(error.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="flex items-center justify-around w-full h-screen">
      <FileUploadInput setFile={setFile} />
      <GenerateButton onClick={handleGenerate} />
      <LatexRender latex={latex} />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
