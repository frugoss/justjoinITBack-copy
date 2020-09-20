const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send()
    }catch (err){
        res.status(400).send(err.errors.email.message)
    }
});

router.post('/', async (req,res) => {
    const createCookie = token => {
        return `Authorization=${token}; HTTPOnly; Path=/; Max-Age=${60 * 60}`
    };
    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send("Email or password is wrong");
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 60*60});
    res.setHeader('Set-Cookie', createCookie(token));
    res.send(user._id)
});

router.post('/logout',(req,res) => {
    res.setHeader('Set-Cookie', 'Authorization=; Path=/; HTTPOnly; Max-Age=1')
    res.send()
})

module.exports = router;
