const authService = require('../services/authService');

module.exports = {
    register: (req, res) => {
        if (req.body.password != req.body.cpassword){
            res.send("passwords dont match");
        }
        else{
            authService.register(req.body.email, req.body.password, req.body.username, req.body.token).then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err.message);
            })

        }
    }
};