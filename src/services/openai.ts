export interface OpenAIConfig {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  apiKey?: string; // ADICIONADO
}

export class OpenAIService {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  private systemPrompt: string;

  constructor(config: OpenAIConfig = {}) {
    // CORRIGIDO: Prioridade para apiKey fornecida no config
    this.apiKey = this.getApiKey(config.apiKey);
    this.model = "gpt-4o-mini";
    this.maxTokens = config.maxTokens ?? 500;
    this.temperature = config.temperature ?? 0.7;
    this.systemPrompt =
      config.systemPrompt ??
      "You are a helpful AI assistant. Be concise, friendly, and helpful in your responses.";
  }

  private getApiKey(providedKey?: string): string {
    if (providedKey) {
      return providedKey;
    }

    if (
      typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_OPENAI_API_KEY
    ) {
      return import.meta.env.VITE_OPENAI_API_KEY;
    }

    if (typeof window !== "undefined" && (window as any).OPENAI_API_KEY) {
      return (window as any).OPENAI_API_KEY;
    }

    return "";
  }

  // ... resto do código permanece igual
  async sendMessage(
    messages: ChatMessage[],
    userMessage: string
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error("OpenAI API key not configured");
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: this.model,
            messages: [
              { role: "system", content: this.systemPrompt },
              ...messages,
              { role: "user", content: userMessage },
            ],
            max_tokens: this.maxTokens,
            temperature: this.temperature,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `OpenAI API Error: ${error.error?.message ?? "Unknown error"}`
        );
      }

      const data = await response.json();
      return (
        data.choices[0]?.message?.content?.trim() ??
        "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.trim() !== "";
  }

  getConfig() {
    return {
      model: this.model,
      maxTokens: this.maxTokens,
      temperature: this.temperature,
      isConfigured: this.isConfigured(),
    };
  }
}
