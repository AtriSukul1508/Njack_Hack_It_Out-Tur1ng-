const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

const verifyAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id, email } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await UserModel.findById({ _id }).select('_id');
        next();
    } catch (err) {
        console.log(`Error while verifying token - ${err}`);
        res.status(401).json({ error: "Request is not authorized" });
    }
}

module.exports = verifyAuth;