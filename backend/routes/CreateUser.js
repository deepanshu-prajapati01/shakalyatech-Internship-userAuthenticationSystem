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


////////////////////////////////////////////////////////////////////////////////////////////////////
// ^ ROUTE 1: User sign up
router.post("/createaccount", [
    // this one carries the basic input authentication
    body('name', "Name must contain at least 3 characters.").isLength({ min: 3 }),
    body('email', "Please enter a valid email address").isEmail(),
    body('mobilenumber', "Please enter a valid mobile number").isLength({ min: 10, max: 10 }),
    body('username', "Username must contain at least 5 characters").isLength({ min: 5 }),
    body('password', "Password must contain at least 8 characters").isLength({ min: 8 })
], async (req, res) => {
    // checking for any kind of errors if occurred
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array(), "success": "false" });
    }

    // check whether the email address, phone number, username already exists.
    try {
        let user = {
            email: await User.findOne({ Email: req.body.email }),
            mobilenumber: await User.findOne({ MobileNumber: req.body.mobilenumber }),
            username: await User.findOne({ Username: req.body.username })
        }
        // checking if no duplicity comes to the program, this insures whether the username, email , mobile number already exists with any other account. If it is, the newData list.  
        const newData = [];
        for (let key in user) {
            if (user[key] !== null) {
                newData.push(key);
            }
        }

        // to check if there any values 
        if (newData.length !== 0) {
            const duplicity = newData.toString()
            return res.status(400).json({ error: `Sorry, the following => ` + duplicity + ` <= already linked to another account.`, "success": "false" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            // now creating the user with his credentials.
            let user = await User.create({
                Name: req.body.name,
                Email: req.body.email,
                MobileNumber: req.body.mobilenumber,
                Username: req.body.username,
                Password: securePassword
            });

            // to give the user a auth token the following command will be used.
            const data = {
                user: {
                    id: user.id
                }
            }

            // giving auth token
            const authToken = jwt.sign(data, JWT_SECRET);
            res.status(200).json({ authToken, "message": "User Created Successfully!", "success": "true" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal Server Error occurred!", "detailedError": error, "success": "true" })
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////

// ^ ROUTE 2: User log in 

router.post('/login', [
    body('username', "Username must contain at least 5 characters").isLength({ min: 5 }),
    body('password', "Password must contain at least 8 characters").isLength({ min: 8 })
], async (req, res) => {
    // check for any type of error that occurred the input 
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(400).json({ "error": errors.array(), "success": "false" });
    }

    else {
        try {
            let user = await User.findOne({ "Email": req.body.email });
            if (!user) {
                return res.status(404).json({ "error": `No email found with the following email.\nEmail: ${req.body.email}`, "success": "false" })
            }
            else {
                const comparePassword = await bcrypt.compare(req.body.password, user.Password)
                if (!comparePassword) {
                    return res.status(401).json({ "error": "Invalid Credentials", "success": "false" })
                }

                // giving out the auth token for successful login
                const data = {
                    user: {
                        id: user.id
                    }
                }

                // giving out the auth token
                const authToken = jwt.sign(data, JWT_SECRET);
                res.status(200).json({ authToken, "message": "Logged In Successfully!", "success": "true" })

            }
        } catch (error) {
            res.status(500).json({ "error": "Internal Server Error occurred!", "detailedError": error, "success": "false" })
        }
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;