const express = require('express');
const User = require('../models/User');

const router = express.Router();

//route for post
router.post('/users', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
