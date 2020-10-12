import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { AddUserPayload } from "./User.payloads";
import UserEntity from "./User.entity";

@Resolver()
class UserResolver {
  @Query(() => [UserEntity])
  users() {
    return UserEntity.find();
  }

  @Query(() => UserEntity)
  user(@Arg("id") id: string) {
    return UserEntity.findOne({ where: { id } });
  }

  @Mutation(() => UserEntity)
  async addUser(@Arg("data") data: AddUserPayload): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { name: data.name } });

    if (user) {
      throw new Error("A user with this name already exists");
    } else {
      const user = UserEntity.create(data);
      await user.save();

      return user;
    }
  }
}

export default UserResolver;
