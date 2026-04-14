export interface LLMRequest {
  prompt: string
  maxTokens?: number
  temperature?: number
}

export interface LLMResponse {
  content: string
}

export interface LLMProvider {
  name: string

  generateReview(request: LLMRequest): Promise<LLMResponse>
}