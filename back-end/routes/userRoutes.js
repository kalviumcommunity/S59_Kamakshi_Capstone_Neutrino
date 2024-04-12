const express = require('express');
const User = require('../models/User');

const router = express.Router();


router.post('/users', async (req, res) => {
    try {
        const { first_name, last_name, email, password, username, marketing_accept } = req.body;
        const user = new User({ first_name, last_name, email, password, username, marketing_accept });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { username, password, email }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
