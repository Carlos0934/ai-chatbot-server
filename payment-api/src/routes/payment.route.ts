import { Hono } from "hono";
import { PaymentService } from "../services/payment.service";
import { StripePaymentProvider } from "../services/paymentProviders/strypePaymentProvider";
import {
  confirmPaymentIntentValidator,
  createPaymentIntentValidator,
  paymentProviderTypeValidator,
} from "../schemas";
import stripe from "../config/stripe";

const paymentRoute = new Hono();

const paymentService = new PaymentService({
  stripe: new StripePaymentProvider(stripe),
});

paymentRoute.post(
  "/:type/intent",
  paymentProviderTypeValidator,
  createPaymentIntentValidator,
  async (c) => {
    const data = c.req.valid("json");
    const type = c.req.valid("param").type;
    const res = await paymentService.createPaymentIntent(type, data);
    return c.json(res);
  }
);

paymentRoute.patch(
  "/:type/intent",
  paymentProviderTypeValidator,
  confirmPaymentIntentValidator,
  async (c) => {
    const data = c.req.valid("json");
    const type = c.req.valid("param").type;
    const res = await paymentService.confirmPaymentIntent(type, data);
    return c.json(res);
  }
);

export default paymentRoute;
