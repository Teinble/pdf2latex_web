import { FaArrowDown } from "react-icons/fa";

interface GenerateButtonProps {
    onClick: () => void;
    disabled?: boolean;
}
export const GenerateButton = ({ onClick, disabled = false }: GenerateButtonProps) => {
    return (
        <button className="btn" onClick={onClick} disabled={disabled}>
            Generate
            <FaArrowDown />
        </button>
    );
}