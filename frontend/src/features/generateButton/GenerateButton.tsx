import { FaArrowRight } from "react-icons/fa";

interface GenerateButtonProps {
    onClick: () => void;
}
export const GenerateButton = ({ onClick }: GenerateButtonProps) => {
    return (
        <button className="btn" onClick={onClick}>
            Generate
            <FaArrowRight />
        </button>
    )
}