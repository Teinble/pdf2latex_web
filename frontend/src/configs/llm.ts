const DEFAULT_TEMP = import.meta.env.TEMPERATURE
	? parseFloat(import.meta.env.TEMPERATURE)
	: 0;
const DEFAULT_MAX_TOKENS = import.meta.env.MAX_TOKENS
	? parseInt(import.meta.env.MAX_TOKENS, 10)
	: 256;

export interface ModelConfig {
	id: string;
	label: string;
	model: string;
	endpoint: string;
	temperature?: number;
	max_tokens?: number;
}

export const MODELS: ModelConfig[] = [
	{
		id: "1",
		label: "scottcfy/Qwen2-VL-2B-Instruct-pdf2latex",
		model: "scottcfy/Qwen2-VL-2B-Instruct-pdf2latex",
		endpoint: "http://localhost:8005/v1/chat/completions",
		temperature: DEFAULT_TEMP,
		max_tokens: DEFAULT_MAX_TOKENS,
	},
	{
		id: "2",
		label: "Base Model: Qwen2-VL-2B-Instruct",
		model: "Qwen/Qwen2-VL-2B-Instruct",
		endpoint: "http://localhost:8006/v1/chat/completions",
		temperature: DEFAULT_TEMP,
		max_tokens: DEFAULT_MAX_TOKENS,
	},
];
