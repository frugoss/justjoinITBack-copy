const router = require('express').Router();
const verify = require('./verifyToken');
const Offer = require('../models/offer.model');

router.post('/', verify, (req, res) => {


    const newOffer = new Offer({
        ...req.body
    });

    newOffer.save().then(() => res.json('Offer added!')).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
