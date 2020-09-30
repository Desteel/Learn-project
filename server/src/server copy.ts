import express from "express";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    ip: String
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
    getDie(numSides: Int): RandomDie
    getMessage(id: ID!): Message
  }
  
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
  id;
  content;
  author;
  constructor(id: string, { content, author }: any) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

class RandomDie {
  numSides;

  constructor(numSides: any) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }: any) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

const fakeDatabase: any = {};

const loggingMiddleware = (req: any, _res: any, next: any) => {
  console.log("ip:", req.ip);
  next();
};

// The root provides a resolver function for each API endpoint
const rootValue = {
  ip: function (_args: any, request: any) {
    return request.ip;
  },
  getMessage: ({ id }: any) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }: any) => {
    // Create a random id for our "database".
    var id = require("crypto").randomBytes(10).toString("hex");

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }: any) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  getDie: ({ numSides }: any) => {
    return new RandomDie(numSides || 6);
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: (args: { numDice: number; numSides?: number }) => {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  }
};

// const app = express();
// app.use(loggingMiddleware);
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     rootValue,
//     graphiql: true
//   })
// );
// app.listen(4000);
// console.log("Running a GraphQL API server at http://localhost:4000/graphql");
