const express = require('express');
const webSocket = require('ws');
const UplinkMessage = require('../MainApp/models/uplinkMessage');//ako ce runnat na odvojenom kontejneru treba ovaj model kopirat
const os = require('os');
const mongoose = require('mongoose');

const port = /*process.env.SERVER_PORT ||*/ 3000;
const dbURI = 'mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/diplomskiRadJelenic?retryWrites=true&w=majority';
const wsURL = 'wss://eu1.loriot.io/app?token=vnoh3wAAAA1ldTEubG9yaW90LmlvCoH9Jt8pL4NSI5MpfkWUjQ==';

const app = express();
app.listen(port, () => {
    console.info('writeToDB server started on port: ' + port);
    //let connectedToDB = false;
    //connectToDB();
})

app.get('/', function (req, res) {
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
        mongoose.connect(dbURI, 
        { useNewUrlParser: true, useUnifiedTopology: true }, 
        async function(err, db){
                splitData = e.data.split(os.EOL);
                splitData.forEach(element => {
                    json = JSON.parse(element);
                    if (typeof json['data']!=="undefined" && json['cmd']==="rx"){
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
                            mongoose.connection.close();
                        }).catch((err) => {
                            console.log(uplinkMessageM);
                            console.log('something went wrong');
                            console.log(err);
                            mongoose.connection.close();
                        });
                    }
                })
                
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