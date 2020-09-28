import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  Mutation,
  Resolver,
  Query,
  Arg,
  ObjectType,
  InputType,
  Field,
  ID,
  buildSchema
} from "type-graphql";
import { createId } from "helpers";

@ObjectType()
class User {
  @Field(_type => ID)
  id: string;

  @Field({ description: "The name of the user" })
  name: string;
}

@InputType()
class AddUserInput implements Partial<User> {
  @Field()
  name: string;
}

@Resolver()
class UserResolver {
  private userCollection: User[] = [
    {
      id: "a",
      name: "alice"
    },
    {
      id: "b",
      name: "bob"
    }
  ];

  @Query(_returns => [User])
  users(@Arg("id", { nullable: true }) id?: string) {
    if (id) {
      return this.userCollection.filter(user => user.id === id);
    }
    return this.userCollection;
  }

  @Mutation()
  addUser(@Arg("data") { name }: AddUserInput): User {
    const hasUserName = this.userCollection.some(user => user.name === name);
    if (hasUserName) {
      throw new Error("A user with this name already exists");
    } else {
      const newUser = {
        id: createId(),
        name
      };
      this.userCollection.push(newUser);

      return newUser;
    }
  }
}

async function init() {
  try {
    const schema = await buildSchema({
      resolvers: [UserResolver],
      emitSchemaFile: {
        path: "./src/schemes/schema.gql"
      },
      validate: false
    });

    const server = new ApolloServer({ schema });

    const ServerInfo = await server.listen();
    console.log(`🚀  Server ready at ${ServerInfo.url}`);
  } catch (error) {
    console.error(error);
  }
}
init();
