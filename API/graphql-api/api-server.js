import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import express from 'express'
import mongoose from 'mongoose';


const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.start().then(res => {
        server.applyMiddleware({ app });
        app.listen({ port: 4000}, () => 
        console.log(`Server is live on http://localhost:4000${server.graphqlPath}`)
    )
    })

    await mongoose.connect("mongodb://localhost:27017/graphqlproto", {useNewUrlParser: true});


};

startServer();