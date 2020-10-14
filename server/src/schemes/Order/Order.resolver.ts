import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { NotExistingOrder, NotExistingOrderProduct } from "constants/messages";
import { OrderProductEntity, AddOrderProductPayload } from "./OrderProduct";
import OrderEntity from "./Order.entity";

@Resolver()
class OrderResolver {
  @Query(() => [OrderEntity])
  findOrders() {
    return OrderEntity.find();
  }

  @Query(() => OrderEntity)
  findOrder(@Arg("userId") userId: string) {
    return OrderEntity.findOne({
      where: { userId }
    });
  }

  @Mutation(() => OrderEntity)
  async addOrder(
    @Arg("userId") userId: string,
    @Arg("product") product: AddOrderProductPayload
  ): Promise<OrderEntity> {
    let order = await this.findOrder(userId);
    const orderProduct = OrderProductEntity.create(product);

    if (order) {
      order.products.push(orderProduct);
    } else {
      order = OrderEntity.create({ userId });
      order.products = [orderProduct];
    }

    return await order.save();
  }

  @Mutation(() => OrderEntity)
  async updateOrder(
    @Arg("userId") userId: string,
    @Arg("product") productData: AddOrderProductPayload
  ): Promise<OrderEntity> {
    const order = await this.findOrder(userId);

    if (!order) {
      throw new Error(NotExistingOrder);
    }

    const { products } = order;
    const productIndex = products.findIndex(
      ({ productId }) => productId === productData.productId
    );

    if (productIndex < 0) {
      throw new Error(NotExistingOrderProduct);
    }

    products[productIndex] = Object.assign(products[productIndex], productData);

    return await order.save();
  }
}

export default OrderResolver;
