import { type ModelConfig } from "src/configs/llm";
import { LatexRender } from "src/features/latexRender";
import { type ModelResult } from "src/types/ModelResult";
interface ResultRenderProps {
    model: ModelConfig;
    result?: ModelResult;
}

export function ResultRender({ model, result }: ResultRenderProps) {
    return (
        <div key={model.id} className="card border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{model.label}</h3>
                <div className="text-xs opacity-60">
                    {result?.ms ? `${result.ms} ms` : result?.status === "loading" ? "Generating…" : ""}
                </div>
            </div>

            {result?.status === "error" && (
                <div className="text-red-500 text-sm">{result.error}</div>
            )}

            {result?.status === "loading" && (
                <div className="text-sm opacity-70 italic">Generating…</div>
            )}

            {(result?.status === "done" || result?.latex) && (
                <LatexRender latex={result.latex} />
            )}
        </div>
    )

}