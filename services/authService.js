const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const User = require('../models/user');


module.exports = {
    register: async function(email, password, username, token){
        try{
            const hashPassword = await bcrypt.hash(password, 10);
            let user = {
                username: username,
                email: email,
                password: hashPassword,
                loriot_token: token
            }
            //return user;
            const userM = new User({
                username: username,
                email: email,
                password: hashPassword,
                token: token
            })
    
            mongoose.connect(dbURI,
                { useNewUrlParser: true, useUnifiedTopology: true },
                async function(err, db){

                let existingEmail = await User.findOne({email: user['email']})
                .catch((err) => console.log(err));
                let existingUsername = await User.findOne({username: user['username']})
                .catch((err) => console.log(err));

                if (existingEmail !== null || existingUsername !== null) {
                    console.log('existing identifier');
                    return 422;
                }

                userM.save()
                .then((result) => {
                    console.log(result);
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
    }
}