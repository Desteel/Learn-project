import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { AddOrderPayload } from "./Order.payloads";
import OrderEntity from "./Order.entity";
import { OrderProductEntity, AddOrderProductPayload } from "./OrderProduct";

@Resolver()
class OrderResolver {
  @Query(() => [OrderEntity])
  orders() {
    return OrderEntity.find();
  }

  @Query(() => OrderEntity)
  order(@Arg("userId") userId: string) {
    return OrderEntity.findOne({ where: { userId } });
  }

  @Mutation(() => OrderEntity)
  async addOrder(
    @Arg("orderData") orderData: AddOrderPayload,
    @Arg("orderProductsData") orderProductsData: AddOrderProductPayload
  ): Promise<OrderEntity> {
    let order = await OrderEntity.findOne(orderData.userId, {
      relations: ["products"]
    });
    const orderProduct = OrderProductEntity.create(orderProductsData);

    if (order) {
      order.products.push(orderProduct);
    } else {
      order = OrderEntity.create(orderData);
      order.products = [orderProduct];
    }

    return await order.save();
  }
}

export default OrderResolver;
