const express = require('express');
const webSocket = require('ws');
const UplinkMessage = require('./models/uplinkMessage');
const Sensor = require('./models/sensor')
const os = require('os');
const mongoose = require('mongoose');
const elsysDataDecoder = require('./services/elsysDataDecoder');
const oxobuttonDecoder = require('./services/oxobuttonDecoder');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.SERVER_PORT_W;
//const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
//const wsURL = 'wss://eu1.loriot.io/app?token=vnoh3wAAAA1ldTEubG9yaW90LmlvCoH9Jt8pL4NSI5MpfkWUjQ==';
const dbURI = process.env.DBLINK;
const wsURL = process.env.WSURL;


const app = express();
app.listen(port, () => {
    console.info('writeToDB server started on port: ' + port);
    //let connectedToDB = false;
    //connectToDB();
    webSocketC();
})

function connectToDB(){
    mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected to database');
        connectedToDB = true;
    }).catch((err)=>{
        console.error(`error connecting to db. \n${err}`);
    })
}

function webSocketC(){
    const connection = new webSocket(wsURL);

    connection.onopen = () => {
        console.log("Loriot connection established.");
        //res.sendStatus(200);
    }

    connection.onerror = error => {
        console.log(`WebSocket error: ${error}`);
        //res.send(error);
    }

    connection.onmessage = e => {
        console.log("Received data:");
        console.log(e.data);
        console.log("----------------------");
        const jdata = JSON.parse(e.data);
        //console.log(jdata.EUI);
        mongoose.connect(dbURI, 
        { useNewUrlParser: true, useUnifiedTopology: true }, 
        async function(err, db){
            const existingSensor = await Sensor.findOne({EUI: jdata.EUI}).then((result) => {
                //console.log('existing EUI:' + result);
                //console.log('existingSensor query over')
                //resolve(result);
                return (result);
            }).catch((err) => {
                console.log(err)
                reject(err);
            });
            if ((typeof jdata.data!=="undefined" || jdata.data!=="efff") && jdata.cmd==="rx"){
                if (existingSensor == null){
                    console.log('sensor does not exist' )
                }
                else{
                    console.log('type:' + existingSensor.type);
                    let msg = "";
                    if (existingSensor.type == 'elsys'){
                        msg = elsysDataDecoder.decode(elsysDataDecoder.hexToBytes(jdata.data));
                    }
                    else if(existingSensor.type == 'oxobutton'){
                        console.log('data')
                        console.log(jdata.data);
                        msg = oxobuttonDecoder.Decoder(oxobuttonDecoder.hexToBytes(jdata.data));
                        console.log('msg')
                        console.log(msg)
                    }
                    else{
                        msg =jdata.data
                    }
                    let uplinkMessage2M = new UplinkMessage({
                        cmd: jdata.cmd,
                        EUI: jdata.EUI,
                        ts: jdata.ts,
                        bat: jdata.bat,
                        fcnt: jdata.fcnt,
                        port: jdata.port,
                        ack: jdata.ack,
                        data: msg
                    })
                    uplinkMessage2M.save()
                    .then((result) => {
                        console.log('saved measurement to db EUI collection:' + result);
                        //mongoose.connection.close();
                    }).catch((err) => {
                        console.log(uplinkMessage2M);
                        console.log('something went wrong uplinkMessage2M');
                        console.log(err);
                        //mongoose.connection.close();
                    });
                }
            }
                
        })
        
        //save data to db
    }
}