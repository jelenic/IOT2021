const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const downlinkMessage = new Schema({
    cmd: {
        type: String,
    },//type of message, rx for uplink, tx for uplink
    EUI:{
        type: String
    },//device EUI
    port:{
        type: Number
    },//server timestamp
    confirmed:{
        type: Boolean
    },//acknowledgement flag set by the device
    appid:{
        type: String
    },//port as sent by the end device
    data:{
        type: Object
    }//data payload
})

const DownlinkMessage = mongoose.model('DownlinkMessage', downlinkMessage);

module.exports = DownlinkMessage;

/*msg example
{
    "cmd": "tx",
    "EUI": "745BC5300000029B",
    "port": 1,
    "confirmed": true,
    "data": "B20103001D001E001F",
    "appid": "BE7A21DF"
    
}*/