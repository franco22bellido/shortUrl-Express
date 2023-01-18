import mongoose from "mongoose";

const uri = 'mongodb://127.0.0.1:27017/shortUrl';

export default mongoose.connect(process.env.URI)
.then((connection)=>{
console.log("db conenctada");
})
.catch((err)=>{
    console.log("db conenctada");
});
asdoaskdo
3.39