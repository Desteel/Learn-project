import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { updateObjectArray } from "helpers";
import { AddOrderPayload } from "./Order.payloads";
import OrderEntity from "./Order.entity";
import { OrderProductEntity, AddOrderProductPayload } from "./OrderProduct";

const PRODUCT_ID = "productId";

@Resolver()
class OrderResolver {
  @Query(() => [OrderEntity])
  orders() {
    return OrderEntity.find();
  }

  @Query(() => OrderEntity)
  order(@Arg("userId") userId: string) {
    return OrderEntity.findOne({
      where: { userId }
    });
  }

  @Mutation(() => OrderEntity)
  async addOrder(
    @Arg("orderData") orderData: AddOrderPayload,
    @Arg("orderProductsData") orderProductData: AddOrderProductPayload
  ): Promise<OrderEntity> {
    let order = await OrderEntity.findOne({
      where: { userId: orderData.userId }
    });
    const orderProduct = OrderProductEntity.create(orderProductData);

    if (order) {
      order.products = updateObjectArray({
        array: order.products,
        item: orderProduct,
        itemKey: PRODUCT_ID
      });
    } else {
      order = OrderEntity.create(orderData);
      order.products = [orderProduct];
    }

    return await order.save();
  }
}

export default OrderResolver;
