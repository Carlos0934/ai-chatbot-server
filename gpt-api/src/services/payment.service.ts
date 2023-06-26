import {
  ConfirmPaymentIntentRequest,
  CreatePaymentIntentRequest,
  PaymentIntent,
} from "../types.ts";
import { HttpService } from "./http.service.ts";

export class PaymentService extends HttpService {
  constructor(apiUrl: string) {
    super(apiUrl);
  }

  createPaymentIntent({ type, ...request }: CreatePaymentIntentRequest) {
    return this.fetch<PaymentIntent>(`/payments/${type}/intent`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async confirmPaymentIntent({
    type,
    ...request
  }: ConfirmPaymentIntentRequest) {
    await this.fetch(`/payment/${type}/intent`, {
      method: "PATCH",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
