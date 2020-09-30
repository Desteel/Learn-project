import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import UserResolver, { User } from "schemes/Users";

(async function init() {
  try {
    const schema = await buildSchema({
      resolvers: [UserResolver],
      emitSchemaFile: {
        path: "./src/schemes/schema.gql"
      },
      validate: false
    });

    await createConnection({
      type: "sqlite",
      database: "./db.sqlite3",
      entities: [User],
      synchronize: true
    });

    const server = new ApolloServer({ schema });
    const serverInfo = await server.listen(4000);

    console.log(`🚀  Server ready at ${serverInfo.url}`);
  } catch (error) {
    console.error(error);
  }
})();
