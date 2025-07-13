/*------------------------------------------------------------------------
    Day 46 - GraphQL Subscriptions
             Use GraphQL subscriptions for real-time updates
-------------------------------------------------------------------------*/
const { ApolloServer, gql } = require('apollo-server-express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const express = require('express');
const { useServer } = require('graphql-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');

const typeDefs = gql`
    type Message {
        content: String!
    }
    type Query {
        messages: [Message!]
    }
    type Mutation {
        sendMessage(content: String!): Message!
    }
    type Subscription {
        messageSent: Message!
    }
`;

const messages = [];
const pubsub = new PubSub();

const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        sendMessage: (_, { content }) => {
            const message = { content };
            messages.push(message);
            pubsub.publish('MESSAGE_SENT', { messageSent: message });
            return message;
        },
    },
    Subscription: {
        messageSent: {
            subscribe: () => pubsub.asyncIterator('MESSAGE_SENT'),
        },
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
    schema,
});

(async () => {
    await server.start();
    server.applyMiddleware({ app });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    useServer({ schema }, wsServer);

    httpServer.listen(4000, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:4000${server.graphqlPath}`);
    });
})();