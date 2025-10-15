import { FileUploadInput } from "src/features/fileUpload";
import { LatexRender } from "src/features/latexRender";
export default function Home() {
  return (
    <div className="flex items-center justify-around w-full h-screen">
      <FileUploadInput />
      <LatexRender />
    </div>
  );
}
