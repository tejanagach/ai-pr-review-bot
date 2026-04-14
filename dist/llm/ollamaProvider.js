import ollama from "ollama";
export class OllamaProvider {
    name = "ollama";
    async generateReview(request) {
        const response = await ollama.chat({
            model: "qwen3:4b",
            messages: [
                {
                    role: "user",
                    content: request.prompt
                }
            ]
        });
        return {
            content: response.message.content
        };
    }
}
