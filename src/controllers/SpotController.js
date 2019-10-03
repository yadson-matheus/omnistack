const Spot = require('../models/Spot');

module.exports = {
    async store(req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { userId } = req.headers;

        const spot = await Spot.create({
            user: userId,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });

        return res.json(spot);
    }
};