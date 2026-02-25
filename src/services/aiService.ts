/* eslint-disable no-useless-catch */
/**
 * @file services/aiService.ts
 * @author leon.wang
 */

export interface AIConfig {
  apiKey: string;
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4o-mini';
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  enabled: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

const DEFAULT_CONFIG: AIConfig = {
  apiKey: '',
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt:
    'You are a helpful AI assistant for an admin dashboard. You can help users with code explanations, debugging, translations, and general questions. Always provide clear, concise, and accurate answers.',
  enabled: true,
};

const CONFIG_STORAGE_KEY = 'ai_assistant_config';
const CHAT_STORAGE_KEY = 'ai_assistant_chat_history';

/**
 * AI Service
 * Handles OpenAI API communication and configuration management
 */
class AIService {
  private config: AIConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  /**
   * Load config from localStorage
   */
  loadConfig(): AIConfig {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Failed to load config, use default
    }
    return { ...DEFAULT_CONFIG };
  }

  /**
   * Save config to localStorage
   */
  saveConfig(config: Partial<AIConfig>): void {
    this.config = { ...this.config, ...config };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(this.config));
  }

  /**
   * Get current config
   */
  getConfig(): AIConfig {
    return { ...this.config };
  }

  /**
   * Reset config to default
   */
  resetConfig(): void {
    this.config = { ...DEFAULT_CONFIG };
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
          body: JSON.stringify({
            model: this.config.model,
            messages: [{ role: 'user', content: 'Hi' }],
            max_tokens: 10,
          }),
        },
      );

      return response.ok;
    } catch {
      // API test failed
      return false;
    }
  }

  /**
   * Send chat message
   */
  async sendMessage(
    messages: ChatMessage[],
    onProgress?: (text: string) => void,
  ): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }

    if (!this.config.enabled) {
      throw new Error('AI assistant is disabled');
    }

    const apiMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add system prompt if configured
    if (this.config.systemPrompt) {
      apiMessages.unshift({
        role: 'system',
        content: this.config.systemPrompt,
      });
    }

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
          body: JSON.stringify({
            model: this.config.model,
            messages: apiMessages,
            temperature: this.config.temperature,
            max_tokens: this.config.maxTokens,
            stream: !!onProgress,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      if (onProgress && response.body) {
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter((line) => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullText += content;
                  onProgress(fullText);
                }
              } catch {
                // Ignore parsing errors
              }
            }
          }
        }

        return fullText;
      } else {
        // Handle non-streaming response
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
      }
    } catch (error) {
      // AI request failed
      throw error;
    }
  }

  /**
   * Load chat history from localStorage
   */
  loadChatHistory(): ChatMessage[] {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Failed to load chat history
    }
    return [];
  }

  /**
   * Save chat history to localStorage
   */
  saveChatHistory(messages: ChatMessage[]): void {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Failed to save chat history
    }
  }

  /**
   * Clear chat history
   */
  clearChatHistory(): void {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  }
}

export const aiService = new AIService();
