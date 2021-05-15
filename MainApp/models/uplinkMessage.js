const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uplinkMessage = new Schema({
    cmd: {
        type: String,
    },//type of message, rx for uplink
    EUI:{
        type: String
    },//device EUI
    ts:{
        type: Number
    },//server timestamp
    ack:{
        type: Boolean
    },//acknowledgement flag set by the device
    bat:{
        type: Number
    },//device batery status
    fcnt:{
        type: Number
    },//frame counter ?
    port:{
        type: Number
    },//port as sent by the end device
    data:{
        type: String
    }//data payload
})

const UplinkMessage = mongoose.model('UplinkMessage', uplinkMessage);

module.exports = UplinkMessage;