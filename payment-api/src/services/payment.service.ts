import {
  ConfirmPaymentIntentRequest,
  CreatePaymentIntentRequest,
  PaymentIntent,
  PaymentProvider,
  PaymentProviderType,
} from "../types";

export class PaymentService {
  constructor(
    private readonly providers: Record<PaymentProviderType, PaymentProvider>
  ) {}

  async createPaymentIntent(
    providerType: PaymentProviderType,
    request: CreatePaymentIntentRequest
  ): Promise<PaymentIntent> {
    const provider = this.providers[providerType];
    return provider.createPaymentIntent(request);
  }

  async confirmPaymentIntent(
    providerType: PaymentProviderType,
    token: ConfirmPaymentIntentRequest
  ): Promise<PaymentIntent> {
    const provider = this.providers[providerType];
    return provider.confirmPaymentIntent(token);
  }
}
