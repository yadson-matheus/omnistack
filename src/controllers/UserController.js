const User = require('../models/User');

module.exports = {
    async add(req, res) {
        const { email } = req.body;

        if (!email) 
            return res.status(400).json({ error: 'Please provide an email' });

        if (await User.findOne({ email })) 
            return res.status(400).json({ error: 'User already exists' });
        
        User.create(req.body, function (err, user) {
            if (err) 
                return res.status(400).json({ error: 'Registration failed' });

            user.password = undefined;
                    
            return res.status(200).json({ user, token: user.generateToken() });
        });
    },
    async authenticate(req, res) {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ error: 'User or password not found' });

        const user = await User.findOne({ email }).select('+password');

        if (!user) 
            return res.status(400).json({ error: 'User not found' });

        if (!await user.compareHash(password))
            return res.status(400).json({ error: 'Invalid password' });

        user.password = undefined;

        return res.status(200).json({ user, token: user.generateToken() });
    }
};