const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
mongoose.set('strictQuery',true);
mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
}).then(()=>{
    console.log('Connection to the database is done');
}).catch((err)=>{
    console.log(`Error while connecting to the database - ${err}`);
})