const express = require('express')
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


// for using the .env secrets
require('dotenv').config()

// bring the JWT_secret
const JWT_SECRET = process.env.JWT_SECRET;

// ^ ROUTE 1: Edit user details:

router.post('/updatedetails', [
    // this one carries the basic input authentication
    body('name', "Name must contain at least 3 characters.").isLength({ min: 3 }),
    body('email', "Please enter a valid email address").isEmail(),
    body('mobilenumber', "Please enter a valid mobile number").isLength({ min: 10, max: 10 }),
    body('username', "Username must contain at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // checking for any kind of errors if occurred
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array() });
    }

    // checking whether the user giving authorized request!
    try {
        // check whether the new email already exists.
        let user = {
            email: await User.findOne({ Email: req.body.email }),
            username: await User.findOne({ Username: req.body.username }),
            mobilenumber: await User.findOne({ MobileNumber: req.body.mobilenumber })
        }
        res.json(user)

        // if (user) {
        //     return res.status(400).json({ "error": "Sorry this email address is already linked to another account." })
        // }


    } catch (error) {
        res.json(error);
    }
})


module.exports = router