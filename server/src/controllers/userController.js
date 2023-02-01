const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');

const generateAuthToken = (_id, email) => {
    return jwt.sign({ _id, email }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

//login controller 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('sfda')
    try {
        const user = await UserModel.login(email, password);

        //create token
        const token = generateAuthToken(user._id, user.email);
        res.status(200).json({ user, token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const signupUser = async (req, res) => {
    const { name,image, email, phone, password, cpassword } = req.body;
    try {

        const user = await UserModel.signup(name,image, email, phone, password, cpassword);

        //create token
        const token = generateAuthToken(user._id, user.email);

        res.status(201).json({ user, token })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// reset password controller 



module.exports = { loginUser, signupUser, };