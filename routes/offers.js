const router  = require("express").Router();
const User = require('../models/user.model');
let Offer = require('../models/offer.model');
const verify = require('./verifyToken');

router.get('/', async(req,res) => {
    try {
        const offer = await Offer.find()
        res.json(offer);
    }catch(err){
        res.json({message:err})
    }
});

router.get('/me', verify, async (req, res) => {
    try {
        const userID = verify.userID
        const user = await User.findById(userID);
        res.send({email: user.email, id: userID})
    } catch (err) {
    }
});

module.exports = router;
