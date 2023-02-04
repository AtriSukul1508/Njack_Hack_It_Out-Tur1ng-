const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

const isTokenExpired = (token) => {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired
}

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
        if (isTokenExpired(token)) {
            return res.status(401).json({ error: "Token expired" })
        }
        console.log(`Error while verifying token - ${err}`);
        res.status(401).json({ error: "Request is not authorized" });
    }
}

module.exports = verifyAuth;