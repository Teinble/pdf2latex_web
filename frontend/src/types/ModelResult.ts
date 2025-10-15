export type ModelResult = {
	id: string;
	latex: string;
	error?: string;
	ms?: number;
	status: "idle" | "loading" | "done" | "error";
};
