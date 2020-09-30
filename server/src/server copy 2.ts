import express from "express";
import graphql from "graphql";

// Maps id to User object
const fakeDatabase: any = {
  a: {
    id: "a",
    name: "alice"
  },
  b: {
    id: "b",
    name: "bob"
  }
};

// Define the User type
const userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, { id }) => {
        return fakeDatabase[id];
      }
    }
  }
});

// var schema = new graphql.GraphQLSchema({ query: queryType });

// const app = express();
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true
//   })
// );
// app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
