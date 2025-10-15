import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';

interface LaTeXRenderProps {
    latex: string;
}

export function preProcessLatex(input: string): string {
    let s = input.trim();

    // 1) Strip math delimiters if present (handles multiple occurrences)
    // \[ ... \]
    s = s.replace(/\\\[(.*?)\\\]/gs, (_m, inner) => inner);
    // \( ... \)
    s = s.replace(/\\\((.*?)\\\)/gs, (_m, inner) => inner);
    // $$ ... $$
    s = s.replace(/\$\$(.*?)\$\$/gs, (_m, inner) => inner);

    // Also remove any stray leading/trailing delimiters if the above didn't catch them
    s = s.replace(/^\s*\\\[\s*|\s*\\\]\s*$/g, "");
    s = s.replace(/^\s*\\\(\s*|\s*\\\)\s*$/g, "");
    s = s.replace(/^\s*\$\$\s*|\s*\$\$\s*$/g, "");

    // 2) Unwrap \big{(} → ( and \big{)} → ) (and Big/bigg/Bigg)
    s = s.replace(/\\(?:big|Big|bigg|Bigg)\s*\{\s*([()])\s*\}/g, "$1");

    // 3) Remove a trailing solitary backslash (common when copy-pasting)
    s = s.replace(/\\\s*$/g, "");

    return s;
}



export const LatexRender = ({ latex }: LaTeXRenderProps) => {
    const text = preProcessLatex(latex);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            katex.render(text, containerRef.current, { throwOnError: false });
        }
    }, [text])

    return (
        <div className='space-y-4'>
            <div className='border p-2 bg-gray-300 rounded-md'>
                <p className='font-bold'>Compiled Latex:</p>
                <div className="ml-4" id="latex_container" ref={containerRef} />
            </div>
            <div className='border relative'>
                <div className='tooltip tooltip-left absolute right-4' data-tip="Click to copy">
                    <button className='btn btn-ghost'
                        onClick={() => navigator.clipboard.writeText(text)}>
                        <FaCopy />
                    </button>
                </div>
                <p className='font-bold'>Raw Latex:</p>
                <p className='ml-4 italic'>{text}</p>
            </div>
        </div>);

}