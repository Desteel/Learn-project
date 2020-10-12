import { Mutation, Resolver, Arg } from "type-graphql";
import { AddOrderProductPayload } from "./OrderProduct.payloads";
import OrderProductEntity from "./OrderProduct.entity";

@Resolver()
class BasketResolver {
  @Mutation(() => OrderProductEntity)
  async addBasketItem(
    @Arg("data") data: AddOrderProductPayload
  ): Promise<OrderProductEntity> {
    const basketProduct = OrderProductEntity.create(data);
    await basketProduct.save();

    return basketProduct;
  }
}

export default BasketResolver;
