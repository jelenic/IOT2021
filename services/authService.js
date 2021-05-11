const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const User = require('../models/user');

//TO DO: consider connecting to database from a separate file and export the connection


module.exports = {
    register: async function(email, password, username, token){
        try{
            const hashPassword = await bcrypt.hash(password, 10);
            const userM = new User({
                username: username,
                email: email,
                password: hashPassword,
                token: token
            })
    
            mongoose.connect(dbURI,
                { useNewUrlParser: true, useUnifiedTopology: true },
                async function(err, db){
                let existingEmail = await User.findOne({email: email})
                .catch((err) => console.log(err));
                let existingUsername = await User.findOne({username: username})
                .catch((err) => console.log(err));


                if (await existingEmail !== null || existingUsername !== null) {
                    console.log('existing identifier');
                    return 422;
                }

                userM.save()
                .then((result) => {
                    console.log('save:' + result);
                    return (result);
                }).catch((err) => console.log(err));

            });/*.then((result) => console.log('connected to the db'))
            .catch((err) => console.log(err));*/
    
            //res.send(user);
            return userM;
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
                if (await bcrypt.compare(password, user.password)){
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