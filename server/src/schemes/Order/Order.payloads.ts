import { InputType, Field } from "type-graphql";
import { Order } from "./Order.entity";

@InputType()
export class AddOrderPayload implements Order {
  @Field()
  userId: string;
}
