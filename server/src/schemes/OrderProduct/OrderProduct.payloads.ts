import { InputType, Field } from "type-graphql";
import { OrderProduct } from "./OrderProduct.entity";

@InputType()
export class AddOrderProductPayload implements OrderProduct {
  @Field()
  productId: string;

  @Field()
  date: string;

  @Field()
  quantity: number;

  @Field()
  discount?: number;

  @Field()
  isPaid?: boolean;

  @Field()
  isShipped?: boolean;
}
