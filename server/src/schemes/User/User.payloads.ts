import { InputType, Field, Int } from "type-graphql";
import { User } from "./User.entity";

@InputType()
export class AddUserPayload implements User {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Int, { nullable: true })
  phone?: number;

  @Field(() => String, { nullable: true })
  subscriber?: string;
}
