const express = require('express')
const User = require('../models/user');
const router = express.Router();
const fetchDetails = require('../middleware/fetchDetails');


////////////////////////////////////////////////////////////////////////////////////////////////////
// ^ Route 1: Dashboard

router.post("/dashboard", fetchDetails, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ "error": "Error, User not found on the server!", "success": "false" })
        }
        else {
            return res.status(200).json({ user, "success": "true" })
        }
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error occurred", "success": "false" })
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router