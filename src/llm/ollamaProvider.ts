import ollama from "ollama"
import { LLMProvider, LLMRequest, LLMResponse } from "./LLMProvider.js"

export class OllamaProvider implements LLMProvider {
  name = "ollama"

  async generateReview(request: LLMRequest): Promise<LLMResponse> {
    const response = await ollama.chat({
      model: "qwen3:4b",
      messages: [
        {
          role: "user",
          content: request.prompt
        }
      ],
      options: {
        num_ctx: 4096,
        temperature: request.temperature,
        num_predict: request.maxTokens
      },
      keep_alive: "5m",
      stream: false
    })

    return {
      content: response.message.content
    }
  }
}