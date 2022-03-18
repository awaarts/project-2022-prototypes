import { gql } from "apollo-server-express";

export const typeDefs = gql`    
    type User {
        id: ID!
        name: String!
        amountOfHours: Int
    }

    type Mutation {
        createUser(name: String, amountOfHours: Int): User!
    }

    type Query {
        getUsers: [User!]!
    }
`;