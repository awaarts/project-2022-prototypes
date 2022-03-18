import { mongoose, Schema } from "mongoose";

export const User = mongoose.model(
    "User", 
    
    new Schema({
        name: {
            type: String,
            required: true
        },

        amountOfHours: {
            type: Number,
            required: true
        },
    })
);