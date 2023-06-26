import { ChatCompletionRequestMessage } from "openai";

export interface KvStore {
  get<T>(...keys: string[]): Promise<T | null>;
  set<T>(value: T, ...keys: string[]): Promise<void>;
}

export type ChatMessage = {
  id: string;
  text: string;
  timestamp: number;
  isBot: boolean;
  userId: string;
};

export type CreateChatMessageRequest = {
  text: string;
  userId: string;
  isBot: boolean;
};

export type ChatCompletionRequest = {
  messages: ChatCompletionRequestMessage[];
  maxTokens?: number;
  userId: string;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type UpdateOrCreateCartItemRequest = {
  sessionId: string;
  product: Product;
  quantity: number;
};

export type DeleteCartItemRequest = {
  sessionId: string;
  productId: number;
};

export type CreateOrderRequest = {
  sessionId: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
};

export type PayOrderRequest = {
  orderId: number;
  paymentIntentId: string;
  paymentMethod: string;
};

export type GetOrderRequest = {
  id: number;
};

export type CancelOrderRequest = {
  id: number;
};

export type GetOrderResponse = {
  cartItems: {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];
  total: number;
};
export enum OrderStatus {
  Pending,
  Processing,
  Paid,
  Cancelled,
}

export type Order = {
  id: number;
  number: string;
  total: number;
  dateCreated: string;

  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    orderId: number;
  };
  payment?: {
    id: number;
    paymentMethod: string;
    paymentIntentId: string;
    orderId: number;
    datePaid?: string;
  };
  orderItems: {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];

  status: OrderStatus;
};

export type PaymentIntent = {
  id: string;
  amount: number;
};

export type CreatePaymentIntentRequest = {
  amount: number;
  type: PaymentProviderType;
  metadata?: Record<string, string>;
};

export type ConfirmPaymentIntentRequest = {
  token: string;
  type: PaymentProviderType;
};

export enum PaymentProviderType {
  Stripe = "stripe",
}
