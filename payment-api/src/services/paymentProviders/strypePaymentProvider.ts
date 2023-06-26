import Stripe from "stripe";
import {
  ConfirmPaymentIntentRequest,
  CreatePaymentIntentRequest,
  PaymentIntent,
  PaymentProvider,
} from "../../types";

export class StripePaymentProvider implements PaymentProvider {
  constructor(private readonly stripe: Stripe) {}

  async createPaymentIntent(
    request: CreatePaymentIntentRequest
  ): Promise<PaymentIntent> {
    const { amount, metadata } = request;
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata,
    });

    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
    };
  }

  async confirmPaymentIntent({
    token,
  }: ConfirmPaymentIntentRequest): Promise<PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.confirm(token);
    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
    };
  }
}
