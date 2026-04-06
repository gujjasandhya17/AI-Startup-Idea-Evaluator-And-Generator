const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        const { name, email, password } = req.body;
        console.log('Registering user:', email);
        try {
            if (!User) { throw new Error('User model is undefined'); }
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: 'User already exists' });

            user = new User({ name, email, password });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.json({ token, user: { id: user._id, name, email } });
        } catch (err) {
            console.error('Full Register Error:', err);
            res.status(500).json({ msg: 'Server Error', error: err.message, stack: err.stack });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.json({ token, user: { id: user._id, name: user.name, email } });
        } catch (err) {
            console.error('Login Error:', err);
            res.status(500).json({ msg: 'Server Error', error: err.message });
        }
    },
    getMe: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            console.error('getMe Error:', err);
            res.status(500).json({ msg: 'Server Error', error: err.message });
        }
    }
};

module.exports = authController;
