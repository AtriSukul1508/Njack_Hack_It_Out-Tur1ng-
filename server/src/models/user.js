const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
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
    cpassword: {
        type: String,
        required: true,
    }
})

//static signup method

userSchema.statics.signup = async function (name, email, phone, password, cpassword) {
    if (!name || !email || !phone || !password || !cpassword) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (phone.length !== 10) {
        throw Error("Phone Number have to be of length 10")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }
    if (password !== cpassword) {
        throw Error("Password does not match");
    }

    const doesEmailExist = await this.findOne({ email });
    if (doesEmailExist) {
        throw Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    const hash_cpassword = await bcrypt.hash(cpassword, salt);
    const user = new this({ name,email,phone, password: hash_password, cpassword: hash_cpassword });
    const userdata = await user.save();

    return userdata;

}

//static login method

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    const userExists = await this.findOne({ email });
    if (!userExists) {
        throw Error("Invalid login details");
    }
    const comparePassword = await bcrypt.compare(password, userExists.password);
    if (!comparePassword) {
        throw Error("Invalid login credentials");
    }
    return userExists;
}


module.exports = mongoose.model('User', userSchema);