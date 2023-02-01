require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');
app.use(cors({
    origin: ['https://tur1ng.vercel.app','http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}))
require('./db/connection');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use('/userapi', userRouter);
app.use('/blogapi', blogRouter);


app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
})