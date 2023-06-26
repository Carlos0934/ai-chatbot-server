import { CreateOrderRequest, Order, PayOrderRequest } from "../types.ts";
import { HttpService } from "./http.service.ts";

export class OrderService extends HttpService {
  createOrder(request: CreateOrderRequest) {
    return this.fetch<Order>("/order", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getOrder(id: number) {
    return this.fetch<Order | null>(`/order/${id}`);
  }
  getOrders(email: string) {
    return this.fetch<Order[]>(`/order?email=${email}`);
  }

  async payOrder(request: PayOrderRequest) {
    await this.fetch(`/order/pay`, {
      method: "PATCH",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async cancelOrder(id: number) {
    await this.fetch(`/order/cancel`, {
      method: "PATCH",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
