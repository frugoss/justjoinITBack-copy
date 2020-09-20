const jwt = require('jsonwebtoken');

const verifyToken = async function  (req,res,next) {
    const cookies = req.cookies
    if (cookies && cookies.Authorization) {

        try {
            const verified = jwt.verify(cookies.Authorization, process.env.TOKEN_SECRET);
            const userID = verified._id
            module.exports.userID = userID;
            req.user = verified;
            next();
        } catch (err) {
            res.status(400).send('Invalid Token');
        }
    } else {
        return res.status(401).send('Access Denied');
    }
};

module.exports = verifyToken
