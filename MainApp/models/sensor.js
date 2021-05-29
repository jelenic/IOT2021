const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensor = new Schema({
    EUI:{
        type: String
    },//device EUI
    type:{
        type: String
    },//type of encryption of data
    user:{
        type:Object
    },//user to whom sensor belongs
    desc:{
        type:String
    }//description of a device
})

const Sensor = mongoose.model('Sensor', sensor);

module.exports = Sensor;