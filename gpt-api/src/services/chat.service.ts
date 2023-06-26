import { ChatMessage, CreateChatMessageRequest, KvStore } from "../types.ts";

export class ChatService {
  constructor(private readonly kvStore: KvStore) {}

  private createChatMessage(request: CreateChatMessageRequest) {
    const timestamp = Date.now();
    const id = crypto.randomUUID();
    return {
      ...request,
      timestamp,
      id,
    };
  }
  async getMessages(chatId: string): Promise<ChatMessage[]> {
    const messages = await this.kvStore.get<ChatMessage[]>("chats", chatId);
    return messages ?? [];
  }

  async addMessage(
    chatId: string,
    request: CreateChatMessageRequest
  ): Promise<void> {
    const message = this.createChatMessage(request);
    const messages = await this.getMessages(chatId);
    messages.push(message);
    await this.kvStore.set(messages, "chats", chatId);
  }

  async clearMessages(chatId: string): Promise<void> {
    await this.kvStore.set([], "chats", chatId);
  }

  async bulkAddMessages(
    chatId: string,
    requests: CreateChatMessageRequest[]
  ): Promise<void> {
    const messages = requests.map((request) => this.createChatMessage(request));
    const currentMessages = await this.getMessages(chatId);
    const newMessages = [...currentMessages, ...messages];
    await this.kvStore.set(newMessages, "chats", chatId);
  }
}
