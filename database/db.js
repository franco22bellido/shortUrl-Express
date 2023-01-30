import mongoose from "mongoose";

const uri = 'mongodb://127.0.0.1:27017/shortUrl';

mongoose.set('strictQuery', true);
export default mongoose.connect(process.env.URI || uri)
.then((connection)=>{
console.log("db conenctada");
})
.catch((err)=>{
    console.log(err);
});
