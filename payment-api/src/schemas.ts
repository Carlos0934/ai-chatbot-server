import { Schema, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
  ConfirmPaymentIntentRequest,
  CreatePaymentIntentRequest,
  PaymentProviderType,
} from "./types";

const createPaymentIntentSchema: Schema<CreatePaymentIntentRequest> = z.object({
  amount: z.number(),
  metadata: z.optional(z.record(z.string())),
});

const confirmPaymentIntentSchema: Schema<ConfirmPaymentIntentRequest> =
  z.object({
    token: z.string(),
  });

export const paymentProviderTypeSchema = z.nativeEnum(PaymentProviderType);

export const createPaymentIntentValidator = zValidator(
  "json",
  createPaymentIntentSchema
);
export const confirmPaymentIntentValidator = zValidator(
  "json",
  confirmPaymentIntentSchema
);
export const paymentProviderTypeValidator = zValidator(
  "param",
  z.object({
    type: paymentProviderTypeSchema,
  })
);
