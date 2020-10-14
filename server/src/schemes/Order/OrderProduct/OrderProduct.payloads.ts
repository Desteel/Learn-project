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

  @Field({ defaultValue: 0 })
  discount?: number;

  @Field({ defaultValue: false })
  isPaid?: boolean;

  @Field({ defaultValue: false })
  isShipped?: boolean;
}
