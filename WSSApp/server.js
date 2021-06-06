const express = require('express');
const webSocket = require('ws');
const UplinkMessage = require('./models/uplinkMessage');
const Sensor = require('./models/sensor')
const os = require('os');
const mongoose = require('mongoose');
const elsysDataDecoder = require('./services/elsysDataDecoder');
const oxobuttonDecoder = require('./services/oxobuttonDecoder');

const port = /*process.env.SERVER_PORT ||*/ 3000;
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const wsURL = 'wss://eu1.loriot.io/app?token=vnoh3wAAAA1ldTEubG9yaW90LmlvCoH9Jt8pL4NSI5MpfkWUjQ==';

// http://oxobutton.ch/products/oxobutton-lorawan/documentation decoder for oxobutton

const app = express();
app.listen(port, () => {
    console.info('writeToDB server started on port: ' + port);
    //let connectedToDB = false;
    //connectToDB();
})

app.get('/', function (req, res) {
    /*console.log('data')
    console.log('3008000000006419015afed513e7')
    msg = oxobuttonDecoder.Decoder(oxobuttonDecoder.hexToBytes('3008000000006419015afed513e7'));
    console.log('msg')
    console.log(msg)*/
    /*mongoose.connect(dbURI, 
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
        async function(err, db){
    const uplinkMessageM = new UplinkMessage({
        cmd: "rx",
        EUI: "test",
        ts: 0,
        bat: 0,
        fcnt: 0,
        port: 0,
        ack: false,
        data: "ayyyyyLmao"
    })
    uplinkMessageM.save()
    .then((result) => {
        console.log('saved measurement to db:' + result);
        mongoose.connection.close();
    }).catch((err) => {
        console.log(uplinkMessageM);
        console.log('something went wrong');
        console.log(err);
        mongoose.connection.close();
    });
})*/
    const connection = new webSocket(wsURL);

    connection.onopen = () => {
        console.log("Loriot connection established.");
        res.sendStatus(200);
    }

    connection.onerror = error => {
        console.log(`WebSocket error: ${error}`);
        res.send(error);
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
                /*const uplinkMessageM = new UplinkMessage({
                    cmd: jdata.cmd,
                    EUI: jdata.EUI,
                    ts: jdata.ts,
                    bat: jdata.bat,
                    fcnt: jdata.fcnt,
                    port: jdata.port,
                    ack: jdata.ack,
                    data: jdata.data
                })
                uplinkMessageM.save()
                .then((result) => {
                    console.log('saved measurement to db uplinkMessage:' + result);
                }).catch((err) => {
                    console.log(uplinkMessageM);
                    console.log('something went wrong uplinkMessage');
                    console.log(err);
                });*/
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
            /*    splitData = e.data.split(os.EOL);
                splitData.forEach(element => {
                    json = JSON.parse(element);
                    if ((typeof json['data']!=="undefined" || json['data']!=="efff") && json['cmd']==="rx"){
                        //const msg = {msg:json['data']}
                        const uplinkMessageM = new UplinkMessage({
                            cmd: json['cmd'],
                            EUI: json['EUI'],
                            ts: json['ts'],
                            bat: json['bat'],
                            fcnt: json['fcnt'],
                            port: json['port'],
                            ack: json['ack'],
                            data: json['data']
                        })
                        uplinkMessageM.save()
                        .then((result) => {
                            console.log('saved measurement to db:' + result);
                            //mongoose.connection.close();
                        }).catch((err) => {
                            console.log(uplinkMessageM);
                            console.log('something went wrong');
                            console.log(err);
                            //mongoose.connection.close();
                        });
                        if (existingSensor == null){
                            console.log('sensor does not exist' )
                        }
                        else{
                            console.log('type:' + existingSensor.type);
                            if (exsistingSensor.type == 'elsys'){
                                const msg = elsysDataDecoder.decode(elsysDataDecoder.hexToBytes(json['data']));
                            }
                            else{
                                msg = 'default'
                            }
                            const uplinkMessage2M = new UplinkMessage({
                                cmd: json['cmd'],
                                EUI: json['EUI'],
                                ts: json['ts'],
                                bat: json['bat'],
                                fcnt: json['fcnt'],
                                port: json['port'],
                                ack: json['ack'],
                                data: msg
                            },{collection : json['EUI']})
                            uplinkMessage2M.save()
                            .then((result) => {
                                console.log('saved measurement to db:' + result);
                                mongoose.connection.close();
                            }).catch((err) => {
                                console.log(uplinkMessageM);
                                console.log('something went wrong');
                                console.log(err);
                                mongoose.connection.close();
                            });
                        }
                    }
                })*/
                
        })
        
        //save data to db
    }
});
function connectToDB(){
    mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected to database');
        connectedToDB = true;
    }).catch((err)=>{
        console.error(`error connecting to db. \n${err}`);
    })
}