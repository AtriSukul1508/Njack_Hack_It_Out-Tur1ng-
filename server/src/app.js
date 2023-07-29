require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const expressSession = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(expressSession)
const store = new MongoDBSession({uri: process.env.MONGO_URL, collection: "resetCode"}) 
app.use(expressSession({
    secret:'My_secret',
    saveUninitialized:false,
    resave:false,
    store
}))
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');
app.use(cors({
    origin: ['https://tur1ng.vercel.app','http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}))
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
require('./db/connection');
app.use('/userapi', userRouter);
app.use('/blogapi', blogRouter);



app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
})