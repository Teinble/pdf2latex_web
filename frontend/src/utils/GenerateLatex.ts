import type { ModelConfig } from "src/configs/llm";

async function generateLatexByBase64(fileBase64: string, model: ModelConfig) {
	const body = {
		model: model.model,
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: "Transcribe the given image to LaTeX. !Important: Output just the latex code without any additional explanations.",
					},
					{ type: "image_url", image_url: { url: fileBase64 } },
				],
			},
		],
		max_tokens: model.max_tokens,
		temperature: model.temperature,
	};

	const response = await fetch(model.endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error("Failed to generate LaTeX");
	}

	const data = await response.json();
	return data.choices[0].message.content;
}

export default generateLatexByBase64;
