const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

router.post('/users', async (req, res) => {
  console.log("Received data:", req.body); 
  try {
      const { email, password, username } = req.body;

      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
          console.log("Email already exists:", email);  
          return res.status(400).json({ message: 'Email already exists.' });
      }

      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
          console.log("Username already exists:", username);  
          return res.status(400).json({ message: 'Username already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, username });
      await user.save();
      console.log("User created successfully:", user);  
      res.status(201).json(user);
  } catch (error) {
      console.error("Error creating user:", error.message); 
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

      const token = generateToken(user);

      res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: error.message });
  }
});

router.get('/users', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
