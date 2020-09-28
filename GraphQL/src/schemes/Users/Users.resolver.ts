import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { AddUserInput } from "./Users.inputs";
import User from "./Users.model";
import { createId } from "helpers";

@Resolver()
class UsersResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  user(@Arg("id", { nullable: true }) id?: string) {
    return User.findOne({ where: { id } });
  }

  @Mutation()
  async addUser(@Arg("data") { name }: AddUserInput): Promise<User> {
    const user = await User.findOne({ where: { name } });

    if (user) {
      throw new Error("A user with this name already exists");
    } else {
      const user = User.create({
        id: createId(),
        name
      });
      await user.save();

      return user;
    }
  }
}

export default UsersResolver;
