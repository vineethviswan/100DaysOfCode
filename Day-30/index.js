
/*------------------------------------------------------------------------
    Day 30: Basic GraphQL Server
            Create a simple GraphQL server using apollo-server
-------------------------------------------------------------------------*/

const { ApolloServer, gql } = require('apollo-server');

// Define the schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!'
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});