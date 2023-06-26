import { OrderService } from "../services/order.service.ts";
import { PaymentService } from "../services/payment.service.ts";
import { ProductService } from "../services/product.service.ts";
import { ShoppingCartService } from "../services/shoppingCart.service.ts";

import { Command } from "./types.ts";

export class CommandHandler {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly paymentService: PaymentService
  ) {
    this.productService = productService;
    this.orderService = orderService;
    this.shoppingCartService = shoppingCartService;
    this.paymentService = paymentService;
  }

  async handle(command: Command) {
    switch (command.type) {
      case "getProduct":
        return this.productService.getProduct(command.payload.id.toString());

      case "getProducts":
        return this.productService.getProducts();

      case "updateOrCreateCartItem":
        return this.shoppingCartService.updateOrCreateCartItem(command.payload);
      case "deleteCart":
        return this.shoppingCartService.deleteShoppingCart(
          command.payload.sessionId
        );
      case "createOrder":
        return this.orderService.createOrder(command.payload);

      case "preparePayment": {
        const order = await this.orderService.getOrder(command.payload.orderId);
        if (!order) {
          throw new Error("Order not found");
        }

        return this.paymentService.createPaymentIntent({
          amount: order.total,
          type: command.payload.paymentProvider,
          metadata: { orderId: order.id.toString() },
        });
      }

      case "payOrder": {
        try {
          await this.paymentService.confirmPaymentIntent({
            token: command.payload.paymentToken,
            type: command.payload.paymentProvider,
          });

          await this.orderService.payOrder({
            orderId: command.payload.orderId,
            paymentIntentId: command.payload.paymentIntentId,
            paymentMethod: command.payload.paymentProvider,
          });

          return true;
        } catch (_error) {
          return false;
        }
      }

      case "getOrder":
        return this.orderService.getOrder(command.payload.id);
      case "cancelOrder":
        return this.orderService.cancelOrder(command.payload.id);
      default:
        throw new Error("Unknown command type");
    }
  }
}
