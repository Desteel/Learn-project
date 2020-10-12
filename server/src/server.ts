import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema, NonEmptyArray } from "type-graphql";
import UserResolver, { UserEntity } from "schemes/User";
import ProductResolver, { ProductEntity } from "schemes/Product";
import OrderResolver, { OrderEntity } from "schemes/Order";
import OrderProductResolver, { OrderProductEntity } from "schemes/OrderProduct";

const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
  OrderResolver,
  OrderProductResolver
];

const entities = [UserEntity, ProductEntity, OrderEntity, OrderProductEntity];

(async function init() {
  try {
    const schema = await buildSchema({
      resolvers,
      emitSchemaFile: {
        path: "./src/schemes/schema.gql"
      },
      validate: false
    });

    await createConnection({
      type: "sqlite",
      database: "./db.sqlite3",
      entities,
      synchronize: true
    });

    const server = new ApolloServer({ schema });
    const serverInfo = await server.listen(4000);

    console.log(`🚀  Server ready at ${serverInfo.url}`);
  } catch (error) {
    console.error(error);
  }
})();
