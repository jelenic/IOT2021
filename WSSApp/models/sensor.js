const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensor = new Schema({
    EUI:{
        type: String
    },//device EUI
    type:{
        type: String
    }
})

const Sensor = mongoose.model('Sensor', sensor);

module.exports = Sensor;