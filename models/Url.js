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
    },
    //añadiendo relacion muchos a uno.
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


export const Url =  mongoose.model("url", urlSchema);