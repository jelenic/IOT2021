const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const User = require('../models/user');

const jwt = require('jsonwebtoken');

//const testKey = ;

//TO DO: consider connecting to database from a separate file and export the connection

/*async function insted of promise
module.exports = {
    login: async function(email, password){
        mongoose.connect(dbURI, 
            { useNewUrlParser: true, useUnifiedTopology: true }, 
            async function(err, db){
                const user = await User.findOne({email: email}).catch((err) => console.log(err));
                if (bcrypt.compare(password, user.password)){
                    //generate jwt
                    console.log('generating jwt');
                    return ({msg: 'generating jwt'});
                }
                else{
                    console.log('passwords dont match');
                    return ({msg: 'passwords dont match'});
                }
        })
    }
}*/

module.exports = {
    /*register: function(email, password, username, token){
        try{
            const hashPassword = hashPassword(password);
            return new Promise((resolve, reject) => {
    
                mongoose.connect(dbURI,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    async function(err, db){
                    let existingEmail = await User.findOne({email: email}).then((result) => {
                        console.log('existing email:' + result);
                        //resolve(result);
                        //return (result);
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err);
                    });
                    let existingUsername = await User.findOne({username: username}).then((result) => {
                        console.log('existing username:' + result);
                        //resolve(result);
                        //return (result);
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err);
                    });


                    if (existingEmail != null || existingUsername != null) {
                        resolve(422)
                        //return 422;
                    }
                    else{
                        const userM = new User({
                            username: username,
                            email: email,
                            password: hashPassword,
                            token: token
                        })
                        console.log(hashPassword);
                        userM.save()
                            .then((result) => {
                                console.log('save:' + result);
                                resolve(result)
                                //return (result);
                            }).catch((err) => {
                                console.log(err)
                                reject(err);
                            });
                    }


                });
        
                //res.send(user);
                })
            
        }
        catch (e){
            console.log(e);
        }
    },*/
    register: async function(email, password, username, token){
        try{
            const hashPassword = await bcrypt.hash(password, 10);
    
            mongoose.connect(dbURI,
                { useNewUrlParser: true, useUnifiedTopology: true },
                async function(err, db){
                let existingEmail = await User.findOne({email: email}).then((result) => {
                    console.log('existing email:' + result);
                })
                .catch((err) => console.log(err));
                let existingUsername = await User.findOne({username: username}).then((result) => {
                    console.log('existing username:' + result);
                })
                .catch((err) => console.log(err));


                if (existingEmail !== null || existingUsername !== null) {
                    console.log('existing identifier');
                    return 422;
                }
                else{
                    const userM = new User({
                        username: username,
                        email: email,
                        password: hashPassword,
                        token: token
                    })

                    userM.save()
                        .then((result) => {
                            console.log('save:' + result);
                            return (result);
                        }).catch((err) => console.log(err));
                }


            });
    
            //res.send(user);
        }
        catch (e){
            console.log(e);
        }
    },
    login: function(email, password){
        return new Promise((resolve, reject) => {
            mongoose.connect(dbURI, 
                { useNewUrlParser: true, useUnifiedTopology: true }, 
                async function(err, db){
                    const user = await User.findOne({email: email}).catch((err) => console.log(err));
                    if (bcrypt.compare(password, user.password)){
                        //generate jwt
                        console.log('generating jwt');
                        let accessToken = generateAccesToken({token: user.token})
                        resolve ({accessToken: accessToken});
                        //return ({msg: 'generating jwt'});
                    }
                    else{
                        console.log('passwords dont match');
                        resolve ('passwords dont match');
                        //return ({msg: 'passwords dont match'});
                    }
            })
        })
    },
    authenticateToken: function(req, res, next){
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
                req.user = user;
                next();
            }
        })
    }
}

function generateAccesToken(token){
    return jwt.sign(token, 'nestostabitrebaocitkljuc'/*, {expiresIn: '3600s', algorithm: 'RS256'}*/);
}

async function hashPassword(password){
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}