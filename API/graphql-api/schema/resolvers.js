import { User } from "../models/User";

export const resolvers = {
    Query: {
        async getUsers() {
            const users = await User.find({});

            return users;
        }
    },

    Mutation: {
        async createUser(_, { name, amountOfHours }) {
            const newUser = new User({name, amountOfHours });
            const createdUser = await newUser.save();

            return createdUser;
        }
    }
};