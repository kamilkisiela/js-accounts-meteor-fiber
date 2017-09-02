export default `
  extend type User {
    messages: [Message]
  }

  type Message {
    id: String!
    text: String
  }
  
  type Query {
    hello: Message
  }

  type Mutation {
    sayHello(id: String!): Message
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
