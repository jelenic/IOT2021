const express = require('express');
const webSocket = require('ws');

const port = /*process.env.SERVER_PORT ||*/ 3000;
const dbURI = 'mongodb+srv://readWrite:<rKsnW2pPLafbHHz>@nodeloraapp.rguzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const wsURL = 'wss://eu1.loriot.io/app?token=vnoh3wAAAA1ldTEubG9yaW90LmlvCoH9Jt8pL4NSI5MpfkWUjQ==';

const app = express();
app.listen(port, () => {
    console.info('writeToDB server started on port: ' + port);
})

app.get('/', function (req, res) {
    const connection = new webSocket(wsURL);

    connection.onopen = () => {
        console.log("Loriot connection established.");
        res.send(200);
    }

    connection.onerror = error => {
        console.log(`WebSocket error: ${error}`);
        res.send(error);
    }

    connection.onmessage = e => {
        console.log("Received data:");
        console.log(e.data);
        //save data to db
    }
});
