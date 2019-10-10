const User = require('../models/User');

module.exports = {
    async add(req, res) {
        await User.create(req.body)
            .then(user => {
                //user.token = user.generateToken();

                return res.status(200).json({ 
                    status: 'success', 
                    user: user.withoutPassword()
                });
            })
            .catch(err => {
                return res.status(400).json({ 
                    status: 'error', 
                    errors: err.errors
                });
            });
    }
};