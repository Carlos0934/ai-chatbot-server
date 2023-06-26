import { Product } from "../types.ts";
import { HttpService } from "./http.service.ts";

export class ProductService extends HttpService {
  constructor(apiUrl: string) {
    super(apiUrl);
  }
  async getProducts(): Promise<Product[]> {
    const products = await this.fetch<Product[]>("/products");

    return products;
  }

  getProduct(id: string): Promise<Product | null> {
    return this.fetch<Product>(`/products/${id}`) ?? null;
  }
}
