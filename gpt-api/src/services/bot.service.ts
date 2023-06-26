import { CommandHandler } from "../command/command.handler.ts";
import createChatCompletion from "../utils/createChatCompletion.ts";
import { ChatService } from "./chat.service.ts";

import { ChatCompletionRequestMessage } from "openai";
import { ChatMessage, CreateChatMessageRequest } from "../types.ts";

const data = await Deno.readTextFile("bot.txt");

export class BotService {
  constructor(
    private readonly chatService: ChatService,
    private readonly commandHandler: CommandHandler
  ) {}
  async handle({ message, userId }: { userId: string; message: string }) {
    const messages = await this.chatService.getMessages(userId);
    const newMessages: CreateChatMessageRequest[] = [];

    if (messages.length == 0) {
      const configMessage = this.createConfigurationMessage();

      newMessages.push({
        isBot: true,
        text: configMessage.content,
        userId: configMessage.role,
      });
    }

    newMessages.push({
      isBot: false,
      text: message,
      userId,
    });

    const botResponse = await this.createBotResponseMessage(
      [...messages, ...newMessages],
      userId
    );
    if (botResponse.content.includes("```")) {
      const start = botResponse.content.indexOf("{");
      const end = botResponse.content.lastIndexOf("}") + 1;

      const result = botResponse.content.substring(start, end);

      const command = JSON.parse(result);

      const commandResponse = await this.commandHandler.handle(command);

      newMessages.push({
        isBot: true,
        text: `> ${JSON.stringify(command)}: ${JSON.stringify(
          commandResponse
        )}`,
        userId: "system",
      });

      const botResponseWithData = await this.createBotResponseMessage(
        [...messages, ...newMessages],
        userId
      );

      return botResponseWithData;
    }

    await this.chatService.bulkAddMessages(userId, newMessages);

    return botResponse;
  }

  private createConfigurationMessage() {
    return {
      role: "system",
      content: data,
    };
  }

  private async createBotResponseMessage(
    messages: Array<ChatMessage | CreateChatMessageRequest>,
    userId: string
  ) {
    const botMessage = await createChatCompletion({
      messages: [
        ...messages.map((message) => ({
          role: message.isBot
            ? "assistant"
            : ("user" as ChatCompletionRequestMessage["role"]),
          content: message.text,
        })),
      ],
      userId,
    });

    return botMessage;
  }
}
