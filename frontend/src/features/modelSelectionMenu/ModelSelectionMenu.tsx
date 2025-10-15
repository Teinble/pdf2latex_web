import { useMemo } from "react";
import type { ModelConfig } from "src/configs/llm";
import { ModelSelectionItem } from "./ModelSelectionItem";

interface ModelSelectionProps {
    models: ModelConfig[];                 // all available models
    selectedModels: ModelConfig[];         // currently selected models
    onSelectModels: (models: ModelConfig[]) => void;
    allowEmpty?: boolean;                  // default true
}

export const ModelSelectionMenu = ({
    models,
    selectedModels,
    onSelectModels,
    allowEmpty = true,
}: ModelSelectionProps) => {
    // Build a Set of selected ids for O(1) lookup
    const selectedIds = useMemo(
        () => new Set(selectedModels.map(m => m.id)),
        [selectedModels]
    );

    const toggle = (id: string) => {
        const isSelected = selectedIds.has(id);
        if (!isSelected) {
            // add
            const model = models.find(m => m.id === id);
            if (!model) return;
            onSelectModels([...selectedModels, model]);
        } else {
            // remove (optionally prevent clearing all)
            if (!allowEmpty && selectedModels.length === 1) return;
            onSelectModels(selectedModels.filter(m => m.id !== id));
        }
    };

    const selectAll = () => onSelectModels(models);
    const clearAll = () => allowEmpty && onSelectModels([]);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Models</div>
                <div className="space-x-2">
                    <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        onClick={selectAll}
                        disabled={selectedModels.length === models.length}
                        title="Select all"
                    >
                        Select all
                    </button>
                    <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        onClick={clearAll}
                        disabled={!allowEmpty || selectedModels.length === 0}
                        title="Clear selection"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap">
                {models.map((model) => {
                    const active = selectedIds.has(model.id);
                    return (
                        <ModelSelectionItem
                            key={model.id}
                            model={model}
                            active={active}
                            toggle={toggle}
                        />
                    );
                })}
            </div>
        </div>
    );
};
