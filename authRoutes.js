const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authMiddleware');

// Register Route
router.post('/register', forwardAuthenticated, async(req, res) => {
    const { username, email, password, password2, role } = req.body;
    let errors = [];

    // Basic Validation
    if(!username || !email || !password || !password2) {
        errors.push({ msg:'Please enter all fields' });
    }

    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    if(password.length<6) {
        errors.push({ msg: 'Password must be at least 6 characters'});
    }

    if(errors.length>0) {
        return res.status(400).json({ errors});
    } else {
        try {
            const user = await User.findOne({ where: { email} });
            if (user) {
                errors.push({ msg: 'Email already exists'});
                return res.status(400).json({ errors});
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                    role: role || 'patient'
                });
                return res.status(201).json({ message: 'User registered successfully' });
            }
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
});

// Login Route
router.post('/login', forwardAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return res.status(500).json({ error: 'Server error' });}
        if (!user) { return res.status(400).json({ error: info.message });}
        req.logIn(user, (err) => {
            if (err) { return res.status(500).json({ error: 'Server error' });}
            return res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, username: user.username, email: user.email, role: user.role} });
        });
    })(req, res, next);
});

// Logout Route
router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout(err => {
        if (err) { return res.status(500).json({ error: 'Could not log out' }); }
        res.status(200).json({ message: 'Logged out successfully'}); 
    });
});

module.exports = router;  