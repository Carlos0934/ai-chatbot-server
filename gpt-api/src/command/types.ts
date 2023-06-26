import { PaymentProviderType, Product } from "../types.ts";

export type GetProductsCommand = {
  type: "getProducts";
  payload: null;
};

export type GetProductCommand = {
  type: "getProduct";
  payload: {
    id: number;
  };
};

export type UpdateOrCreateCartItemCommand = {
  type: "updateOrCreateCartItem";
  payload: {
    sessionId: string;
    product: Product;
    quantity: number;
  };
};

export type DeleteCartCommand = {
  type: "deleteCart";
  payload: {
    sessionId: string;
    productId: number;
  };
};

export type CreateOrderCommand = {
  type: "createOrder";
  payload: {
    sessionId: string;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
  };
};

export type PreparePaymentCommand = {
  type: "preparePayment";
  payload: {
    orderId: number;
    paymentProvider: PaymentProviderType;
  };
};

export type PayOrderCommand = {
  type: "payOrder";
  payload: {
    orderId: number;
    paymentIntentId: string;
    paymentProvider: PaymentProviderType;
    paymentToken: string;
  };
};

export type GetOrderCommand = {
  type: "getOrder";
  payload: {
    id: number;
  };
};

export type CancelOrderCommand = {
  type: "cancelOrder";
  payload: {
    id: number;
  };
};

export type Command =
  | GetProductsCommand
  | GetProductCommand
  | UpdateOrCreateCartItemCommand
  | DeleteCartCommand
  | CreateOrderCommand
  | PreparePaymentCommand
  | PayOrderCommand
  | GetOrderCommand
  | CancelOrderCommand;
