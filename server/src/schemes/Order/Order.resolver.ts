import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { AddOrderPayload } from "./Order.payloads";
import OrderEntity from "./Order.entity";

@Resolver()
class OrderResolver {
  @Query(() => [OrderEntity])
  orders() {
    return OrderEntity.find();
  }

  @Query(() => OrderEntity)
  order(@Arg("id") id: string) {
    return OrderEntity.findOne({ where: { id } });
  }

  @Mutation(() => OrderEntity)
  async addOrder(@Arg("data") data: AddOrderPayload): Promise<OrderEntity> {
    const order = OrderEntity.create(data);
    await order.save();

    return order;
  }
}

export default OrderResolver;
