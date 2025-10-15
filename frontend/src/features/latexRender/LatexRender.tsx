interface LaTeXRenderProps {
    latex: string;
}

export const LatexRender = ({ latex }: LaTeXRenderProps) => {
    return <div>{latex}</div>;
}