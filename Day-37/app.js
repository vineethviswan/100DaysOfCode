
/*------------------------------------------------------------------------
    Day 37: GraphQL with Apollo Server
            Use Apollo Server with Express for GraphQL APIs
-------------------------------------------------------------------------*/

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// constrct schema using gql
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Define resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello, GraphQL with Apollo Server!'
    },
}

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(3000, () => {
        console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
    });    
}

startServer();





