const dotenv = require("dotenv").config();

const mongoose = require("mongoose");

const mongoDB = dotenv.parsed.MONGO_DB;

console.log(mongoDB, "url");

const connectDB = async () => {
    const DBRes = await mongoose.connect(mongoDB);
    const data = DBRes.connection.readyState;
    if(data === 1){
        console.log("DB Connected");
    } else if(data === 2){
        console.log("DB Connecting");
    } else {
        console.log(data);
    }
}


module.exports = {
    mongoose,
    connectDB,
}