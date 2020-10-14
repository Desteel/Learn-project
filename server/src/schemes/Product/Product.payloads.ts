import { InputType, Field, Int } from "type-graphql";
import { Product } from "./Product.entity";

@InputType()
export class AddProductPayload implements Product {
  @Field()
  name: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  manufacturer: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field()
  price: number;

  @Field({ defaultValue: 0 })
  discount?: number;
}
