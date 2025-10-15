import { type ModelConfig } from "src/configs/llm";
interface ModelSelectionItemProps {
    model: ModelConfig;
    active: boolean;
    toggle: (id: string) => void;
}
export const ModelSelectionItem = ({ model, active, toggle }: ModelSelectionItemProps) => {
    return (
        <label
            key={model.id}
            className={`btn btn-sm m-1 gap-2 ${active ? "btn-active" : ""
                }`}
        >
            <input
                type="checkbox"
                className="toggle"
                checked={active}
                onChange={() => toggle(model.id)}
                role="switch"
                aria-checked={active}
                aria-label={model.label}
            />
            <span className="truncate max-w-[10rem]" title={model.label}>
                {model.label}
            </span>
        </label>
    )
};