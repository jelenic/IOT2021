const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const Sensor = require('../models/sensor');
const User = require('../models/user');
const UplinkMessage = require('../models/uplinkMessage');

module.exports = {
    returnAllMessagesWithEUI: function(EUI){
        try{
            return new Promise((resolve, reject) => {
                mongoose.connect(dbURI,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    async function(err, db){
                        const result = await UplinkMessage.find({EUI: EUI}).then((result) => {
                            console.log('result of query');
                            console.log(result);
                            return (result);
                        }).catch((err) => {
                            console.log(err)
                            reject(err);
                        });
                        resolve(result);
                });
            })
        }
        catch (e){
            console.log(e);
        }
    }
}