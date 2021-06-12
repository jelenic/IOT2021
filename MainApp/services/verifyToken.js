const jwt = require('jsonwebtoken');

module.exports = {authenticateToken: function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        return 401;
    }

    jwt.verify(token, 'nestostabitrebaocitkljuc', (err,user) => {
        if (err){
            return 403;
        }
        else{
            console.log("token valid");
            req.user = user;
            next();
        }
    })
}}