import { InputType, Field } from "type-graphql";
import User from "./Users.model";

@InputType()
export class AddUserInput implements Partial<User> {
  @Field()
  name: string;
}
