import { OrderService } from "../services/order.service.ts";
import { PaymentService } from "../services/payment.service.ts";
import { ProductService } from "../services/product.service.ts";
import { ShoppingCartService } from "../services/shoppingCart.service.ts";

const urls = {
    product: "http://product-api:8001",
    shopping: "http://shopping-api :8002",
    payment: "http://payment-api:8003",
    
}

const productService = new ProductService(urls.product)
const orderService = new OrderService(urls.shopping));
const shoppingCartService = new ShoppingCartService(urls.shopping);
const paymentService = new PaymentService(urls.payment);

export { productService, orderService, shoppingCartService, paymentService };
