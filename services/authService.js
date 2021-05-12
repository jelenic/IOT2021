const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const User = require('../models/user');

//TO DO: consider connecting to database from a separate file and export the connection

/*
module.exports = {
    register: async function(email, password, username, token){
        try{
            const hashPassword = await bcrypt.hash(password, 10);
    
            mongoose.connect(dbURI,
                { useNewUrlParser: true, useUnifiedTopology: true },
                async function(err, db){
                let existingEmail = await User.findOne({email: email}).then((result) => {
                    console.log('existing email:' + result);
                    return (result);
                })
                .catch((err) => console.log(err));
                let existingUsername = await User.findOne({username: username}).then((result) => {
                    console.log('existing username:' + result);
                    return (result);
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
    register: function(email, password, username, token){
        try{
            return new Promise((resolve, reject) => {
                const hashPassword = bcrypt.hash(password, 10);
    
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


                    if (existingEmail !== null || existingUsername !== null) {
                        console.log('existing identifier');
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


                });/*.then((result) => console.log('connected to the db'))
                .catch((err) => console.log(err));*/
        
                //res.send(user);
                })
            
        }
        catch (e){
            console.log(e);
        }
    },
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
}