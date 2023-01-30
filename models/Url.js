import mongoose from "mongoose";
const {Schema} = mongoose;

const urlSchema = new Schema({
    origin : {
        type: String,
        required :true
    },
    shortURL: {
        type: String,
        required :true
    }
});


export const Url =  mongoose.model("url", urlSchema);