const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/sendMail');
const bcrypt = require('bcrypt');

//login controller 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('sfda')
    try {
        const user = await UserModel.login(email, password);

        //create token
        const token = await user.generateAuthToken(user._id, user.email);
        res.status(200).json({ user, token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const signupUser = async (req, res) => {
    const { name, image, email, phone, password } = req.body;
    try {

        const user = await UserModel.signup(name, image, email, phone, password);

        //create token
        const token = await user.generateAuthToken(user._id, user.email);

        res.status(201).json({ user, token })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


// forgot password

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(404).json({msg: 'User does not exist'})

        // generate code between 1000-9099
        const resetCode = Math.floor(Math.random() * 9099) + 1000;
        user.passcode = resetCode.toString()
        await user.save()
        sendMail(email, resetCode.toString());
        res.status(200).json({ success: "Code sent to your email" })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: "Invalid code"})
    }

}

// reset password
const resetPassword = async (req, res) => {
    const { resetCode, email, password, cpassword } = req.body
    try{
        if(password === cpassword){

            const user = await UserModel.findOne({ email })
        
            if (user.passcode == resetCode.toString()) {
                if (password === cpassword) {
                    const salt = await bcrypt.genSalt(10)
                    const newPassword = await bcrypt.hash(password, salt);
                    user.passcode = ""
                    user.password = newPassword
                    await user.save();
                    res.status(200).json({user, isPasswordReset: true})
                }else{
                    res.status(400).json({msg: 'Password do not match'})
                }
            } else {
                res.status(500).json({msg: 'Invalid code'})
            }
        } else {
            res.status(500).json({msg: "Password does not match"})
        }
    } catch(err){
        res.status(500).json({msg: err})
    }

}



module.exports = { loginUser, signupUser, forgotPassword, resetPassword };