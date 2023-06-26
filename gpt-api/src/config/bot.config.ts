import { CommandHandler } from "../command/command.handler.ts";
import { KvDenoStore } from "../data/kv.repository.ts";
import { BotService } from "../services/bot.service.ts";
import { ChatService } from "../services/chat.service.ts";
import { paymentService, shoppingCartService } from "./httpServices.ts";
import { orderService } from "./httpServices.ts";
import { productService } from "./httpServices.ts";

const commandHandler = new CommandHandler(
  productService,
  orderService,
  shoppingCartService,
  paymentService
);
const kv = new KvDenoStore("ecommerce");
const chatService = new ChatService(kv);
const botService = new BotService(chatService, commandHandler);

export default botService;
