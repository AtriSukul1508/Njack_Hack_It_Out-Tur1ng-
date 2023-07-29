const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
        token_created_at: {
            type: Date,
            default: Date.now
        }
    }
    ],
    // passwordResetToken: String,
    // passwordResetTokenExpires: Date,
    passcode: {
        type: String,
        default: ''
    }
})

//static signup method
userSchema.statics.signup = async function (name, image, email, phone, password) {
    if (!name || !image || !email || !phone || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (phone.length < 10 || phone.length > 12) {
        throw Error("Phone Number have to be of length 11")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    // const hash_cpassword = await bcrypt.hash(cpassword, salt);
    const user = new this({ name, image, email, phone, password: hash_password});
    const userdata = await user.save();

    return userdata;

}

//static login method

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    const userExists = await this.findOne({ email });
    console.log(userExists);
    if (!userExists) {
        throw Error("Invalid login details");
    }
    const comparePassword = await bcrypt.compare(password, userExists.password);
    if (!comparePassword) {
        throw Error("Invalid login credentials");
    }
    return userExists;
}

//token generation

userSchema.methods.generateAuthToken = async function (_id, email) {
    try {
        console.log(TOKEN)
        const TOKEN = jwt.sign({ _id, email }, process.env.SECRET_KEY, { expiresIn: '3d' });
        this.tokens = this.tokens.concat({ token: TOKEN });
        await this.save();
        return TOKEN;
    } catch (err) {
        console.log(err);
    }
}

// userSchema.methods.createResetPasswordToken = function () {
//     // the password reset token should be a random token but shouldn't be as strong as the password hash
//     // 32 is the size why hex is the format we want it in
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     this.passwordResetToken = crypto.createhash('sha256').update(resetToken).digest('hex');
//     // note in realworld, the password reset token we receive, expires in ten minutes
//     this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;  //this is the number of milliseconds in 10mins, after 10mins, the reset token generated will expire
//     console.log(resetToken, this.passwordResetToken)
//     return resetToken;
// }


module.exports = mongoose.model('User', userSchema);