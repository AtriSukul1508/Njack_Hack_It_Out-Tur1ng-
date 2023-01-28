const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
mongoose.set('strictQuery',true);
mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`,{
    useNewUrlParser:true,
}).then(()=>{
    console.log('Connection to the database is done');
}).catch((err)=>{
    console.log(`Error while connecting to the database - ${err}`);
})