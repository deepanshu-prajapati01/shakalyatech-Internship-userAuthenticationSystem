const jwt = require("jsonwebtoken")
// for using data from .env files
require('dotenv').config();

// JSON secret from .env file 
const JWT_SECRET = process.env.JWT_SECRET;

const fetchDetails = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ "error": "Please authenticate the user to start using the app!", "success": "false" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).json({ "error": "Please authenticate the user using valid credentials!", "success": "false" })
    }

}

module.exports = fetchDetails;