import { useState } from "react";
import { MODELS, type ModelConfig } from "src/configs/llm";
import { FileUploadInput } from "src/features/fileUpload";
import { GenerateButton } from "src/features/generateButton";
import { ModelSelectionMenu } from "src/features/modelSelectionMenu/ModelSelectionMenu";
import { ResultRender } from "src/features/resultRender/ResultRender";
import { type ModelResult } from "src/types/ModelResult";
import fileToBase64 from "src/utils/FileToBase64";
import generateLatexByBase64 from "src/utils/GenerateLatex";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<ModelConfig[]>(MODELS);
  const [results, setResults] = useState<Record<string, ModelResult>>({});
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!file) return setError("Please upload a file");
    if (selectedModels.length === 0) return setError("Please select at least one model");

    setError(null);
    setLoading(true);

    // init result slots
    const initial: Record<string, ModelResult> = {};
    for (const m of selectedModels) {
      initial[m.id] = { id: m.id, latex: "", status: "loading" };
    }
    setResults(initial);

    try {
      const base64 = await fileToBase64(file); // do this ONCE

      await Promise.all(
        selectedModels.map(async (m) => {
          const t0 = performance.now();
          try {
            const latex = await generateLatexByBase64(base64, m);
            const ms = Math.round(performance.now() - t0);
            setResults((prev) => ({
              ...prev,
              [m.id]: { id: m.id, label: m.label, latex, ms, status: "done" },
            }));
          } catch (e: any) {
            const ms = Math.round(performance.now() - t0);
            setResults((prev) => ({
              ...prev,
              [m.id]: {
                id: m.id,
                label: m.label,
                latex: "",
                error: e?.message ?? "Request failed",
                ms,
                status: "error",
              },
            }));
          }
        })
      );
    } catch (e: any) {
      setError(e?.message ?? "Failed to read file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-4 items-center w-4/5 min-h-screen p-6">
        <FileUploadInput setFile={setFile} />
        <GenerateButton
          onClick={handleGenerate}
          disabled={!file || !selectedModels.length || loading}
        />

        {/* Results grid: one panel per selected model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {selectedModels.map((m) => {
            const r = results[m.id];
            return <ResultRender key={m.id} model={m} result={r} />
          })}
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </div>

      <div className="divider divider-horizontal"></div>

      <div className="w-1/5 p-4">
        <ModelSelectionMenu
          models={MODELS}
          selectedModels={selectedModels}
          onSelectModels={setSelectedModels}
        />
      </div>
    </div>
  );
}
