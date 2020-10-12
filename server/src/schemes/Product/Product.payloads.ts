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

  @Field(() => Int)
  price: number;

  @Field(() => Int, { nullable: true })
  discount?: number;
}
