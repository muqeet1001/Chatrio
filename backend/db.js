const mongoose = require('mongoose')
const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URl)
        console.log("Db connected");
    }catch(err){
        console.log("MongoDB connection failed");
        console.log(err);
        
    }
}

module.exports = connectdb