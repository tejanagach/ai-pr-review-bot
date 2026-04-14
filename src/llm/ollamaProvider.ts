import { LLMProvider, LLMRequest, LLMResponse } from "./LLMProvider.js"
import ollama from "ollama"

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
      ]
    })

    return {
      content: response.message.content
    }
  }
}