const { loginUser, signupUser, forgotPassword, resetPassword} = require('../controllers/userController');

const userRouter = require('express').Router();


//login
userRouter.post('/login', loginUser)


//signup
userRouter.post('/signup', signupUser)

// forgotPassword
userRouter.post('/forgotPassword', forgotPassword)
// resetPassword
userRouter.post('/resetPassword', resetPassword)



module.exports = userRouter;