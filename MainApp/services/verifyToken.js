const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = {authenticateToken: function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token);
    if (token === null || token === 'undefined' || token == 'undefined' || token == null){
        console.log("no token");
        return res.sendStatus(401);
    }

    jwt.verify(token, secret, (err,user) => {
        if (err){
            return res.sendStatus(403);
        }
        else{
            console.log("token valid");
            req.user = user;
            next();
        }
    })
}}