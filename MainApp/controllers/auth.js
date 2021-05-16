const authService = require('../services/authService');

module.exports = {
    register: (req, res) => {
        if (req.body.password != req.body.cpassword){
            res.send("passwords dont match");
        }
        else{
            //TO DO data doesn't return what it should check it out
            authService.hashPassword(req.body.password).then((result) => {
                authService.register(req.body.email, result, req.body.username, req.body.token).then((data) => {
                    console.log("log ctrl:" + data);
                    res.send(data);
                }).catch((err) => {
                    res.send(err.message);
                })
            });
            /*authService.register(req.body.email, password, req.body.username, req.body.token).then((data) => {
                console.log("log ctrl:" + data);
                res.send(data);
            }).catch((err) => {
                res.send(err.message);
            })*/

        }
    },
    login: (req, res) => {
        authService.login(req.body.email, req.body.password).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err.message);
        })
    }


};