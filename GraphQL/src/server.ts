import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
  hello: () => {
    return "Hello there!";
  }
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
