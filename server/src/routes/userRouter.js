const { loginUser, signupUser } = require('../controllers/userController');

const userRouter = require('express').Router();


//login
userRouter.get('/hello',async (req,res)=>{
    res.send("Hello");
})

userRouter.post('/login', loginUser)


//signup
userRouter.post('/signup', signupUser)


module.exports = userRouter;