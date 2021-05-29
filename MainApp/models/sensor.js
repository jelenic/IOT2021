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
        type:String
    }//user to whom sensor belongs
})

const Sensor = mongoose.model('Sensor', sensor);

module.exports = Sensor;