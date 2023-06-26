import { GetOrderResponse, UpdateOrCreateCartItemRequest } from "../types.ts";
import { HttpService } from "./http.service.ts";

export class ShoppingCartService extends HttpService {
  constructor(apiUrl: string) {
    super(apiUrl);
  }

  async updateOrCreateCartItem(request: UpdateOrCreateCartItemRequest) {
    await this.fetch("/ShoppingCart", {
      method: "PATCH",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getShoppingCart(id: string) {
    return this.fetch<GetOrderResponse | null>(`/ShoppingCart/${id}`);
  }

  async deleteShoppingCart(id: string) {
    await this.fetch(`/ShoppingCart/${id}`, {
      method: "DELETE",
    });
  }
}
