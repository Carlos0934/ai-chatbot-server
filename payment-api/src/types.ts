export type CreatePaymentIntentRequest = {
  amount: number;
  metadata?: Record<string, string>;
};
export type ConfirmPaymentIntentRequest = {
  token: string;
};

export type PaymentIntent = {
  id: string;
  amount: number;
};

export interface PaymentProvider {
  createPaymentIntent(
    request: CreatePaymentIntentRequest
  ): Promise<PaymentIntent>;

  confirmPaymentIntent: (
    request: ConfirmPaymentIntentRequest
  ) => Promise<PaymentIntent>;
}

export enum PaymentProviderType {
  Stripe = "stripe",
}
