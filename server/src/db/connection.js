const mongoose = require('mongoose');
// const MONGO_URL = process.env.MONGO_URL;
mongoose.set('strictQuery',true);
require('dotenv').config();

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(()=>{
    console.log('Connection to the database is done');
}).catch((err)=>{
    console.log(`Error while connecting to the database - ${err}`);
})