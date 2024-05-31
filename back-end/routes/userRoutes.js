const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, username });
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(id, { username, password: hashedPassword, email }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
