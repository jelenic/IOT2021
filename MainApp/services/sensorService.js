const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.DBLINK;
const Sensor = require('../models/sensor');
const User = require('../models/user');

module.exports = {
    addSensor: function(EUI, type, email, desc){
        try{
            return new Promise((resolve, reject) => {
                mongoose.connect(dbURI,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    async function(err, db){
                        let existingSensor = await Sensor.findOne({EUI: EUI}).then((result) => {
                            console.log('existing EUI:' + result);
                            //resolve(result);
                            return (result);
                        }).catch((err) => {
                            console.log(err)
                            reject(err);
                        });
                        console.log(email);
                        const user = await User.findOne({email: email}).then((result) => {
                            console.log('user:' + result);
                            //resolve(result);
                            return (result);
                        })
                        .catch((err) => {
                            console.log(err)
                            reject(err);
                        });
                        console.log(existingSensor != null);
                        console.log(user);
                        console.log(user == null);
                        if (existingSensor != null || user == null) {
                            resolve(422)
                            //return 422;
                        }
                        else{
                            const sensorM = new Sensor({
                                EUI: EUI,
                                type: type,
                                user: user,
                                desc: desc
                            });
                            sensorM.save()
                            .then((result) => {
                                console.log('saved Sensor:' + result);
                                resolve(result)
                            }).catch((err) => {
                                console.log(err)
                                reject(err);
                            });
                        }
                    });
            })
        }
        catch (e){
            console.log(e);
        }
    }
}