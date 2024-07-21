const express = require('express')
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const fetchDetails = require('../middleware/fetchDetails');

////////////////////////////////////////////////////////////////////////////////////////////////////
// ^ ROUTE 1: Edit user details:

router.put('/updatedetails', fetchDetails, [
    // this one carries the basic input authentication
    body('name', "Name must contain at least 3 characters.").isLength({ min: 3 }),
    body('email', "Please enter a valid email address").isEmail(),
    body('mobilenumber', "Please enter a valid mobile number").isLength({ min: 10, max: 10 }),
    body('username', "Username must contain at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // checking for any kind of errors if occurred
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array(), "success": "false" });
    }

    // id of the user
    const loggedInUserId = req.user.id;

    // checking whether the user giving authorized request!
    try {
        // check whether the new email already exists.
        let user = {
            email: await User.findOne({ Email: req.body.email }),
            username: await User.findOne({ Username: req.body.username }),
            mobilenumber: await User.findOne({ MobileNumber: req.body.mobilenumber })
        }

        // checking if no duplicity comes to the program, this insures whether the username, email , mobile number already exists with any other account. If it is, the newData list.  
        const newData = [];

        for (let key in user) {
            if (user[key] !== null) {
                console.log(user)
                // key can be incorrect too.
                if (loggedInUserId === user[key]._id.toString()) {
                    console.log("This is the same user logged in who do not change their " + key);
                }
                else {
                    newData.push(key);
                }
            }
        }

        // to check if there any values 
        if (newData.length !== 0) {
            const duplicity = newData.toString()
            return res.status(400).json({ error: `Sorry, the following => ` + duplicity + ` <= already linked to another account.`, "success": "false" });
        }
        else {

            // now updating, this takes 2 json .
            // 1 -> to get a unique key
            // 2 -> data to be changed
            let user = await User.findOneAndUpdate({ _id: loggedInUserId }, {
                Name: req.body.name,
                Email: req.body.email,
                MobileNumber: req.body.mobilenumber,
                Username: req.body.username
            });

            // giving auth token
            res.status(200).json({ "message": "Fields Updated Successfully!", "success": "true" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal Server Error occurred!", "detailedError": error, "success": "false" })
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////

// ^ Route 2 : Change Password

router.put('/changepassword', fetchDetails, [
    // this one carries the basic input authentication
    body('oldPassword', "Wrong Password!").isLength({ min: 8 }),
    body('password', "Password must contain at least 8 characters").isLength({ min: 8 })

], async (req, res) => {
    // checking for any kind of errors if occurred
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array(), "success": "false" });
    }

    // id of the user
    const loggedInUserId = req.user.id;

    try {
        let user = await User.findOne({ _id: loggedInUserId })
        const comparePassword = await bcrypt.compare(req.body.oldPassword, user.Password);

        if (!comparePassword) {
            return res.status(401).json({ "error": "Invalid Credentials", "success": "false" });
        }

        else {
            // update user's password
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            await User.findOneAndUpdate({ _id: loggedInUserId }, {
                Password: securePassword
            })
            return res.status(200).json({ "message": "Password Updated Successfully!", "success": "true" })
        }

    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error Occurred", "detailedError": error, "success": "false" })
    }



})

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router