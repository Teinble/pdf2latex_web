async function generateLatexByBase64(
	fileBase64: string,
	endpoint: string,
	model: string,
) {
	const body = {
		model: model,
		messages: [
			{
				role: "user",
				content: [
					{ type: "text", text: "Convert the image to Latex" },
					// {"type": "image_url", "image_url":  {"url": `data:image${fileBase64}`}}
					{ type: "image_url", image_url: { url: fileBase64 } },
				],
			},
		],
		max_tokens: import.meta.env.MAX_TOKENS
			? parseInt(import.meta.env.MAX_TOKENS, 10)
			: 256,
		temperature: import.meta.env.TEMPERATURE
			? parseFloat(import.meta.env.TEMPERATURE)
			: 0,
	};

	const response = await fetch(endpoint, {
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
	console.log("API response data:", data);
	return data.choices[0].message.content;
}

export default generateLatexByBase64;
