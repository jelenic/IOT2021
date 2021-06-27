const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.DBLINK;
const Sensor = require('../models/sensor');
const User = require('../models/user');
const UplinkMessage = require('../models/uplinkMessage');
const DownlinkMessage = require('../models/downlinkMessage');
const OxobuttonDownlinkGenerator = require('../downlinkGenerators/oxobuttonGenerator');

const request = require('request');
const { response } = require('express');
const BASE_URL = 'https://eu1.loriot.io/1/rest';

module.exports = {
    returnAllMessagesWithEUI: function(EUI){
        try{
            return new Promise((resolve, reject) => {
                mongoose.connect(dbURI,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    async function(err, db){
                        const result = await UplinkMessage.find({EUI: EUI}).then((result) => {
                            //console.log('result of query');
                            //console.log(result);
                            return (result);
                        }).catch((err) => {
                            console.log(err)
                            reject(err);
                        });
                        resolve(result);
                });
            })
        }
        catch (e){
            console.log(e);
        }
    },

    returnAllSensorsWithUser: function(username){
        try{
            return new Promise((resolve, reject) => {
                mongoose.connect(dbURI,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    async function(err, db){
                        const result = await Sensor.find({"user.username": username}).then((result) => {
                            console.log('result of query');
                            console.log(result);
                            return (result);
                        }).catch((err) => {
                            console.log(err)
                            reject(err);
                        });
                        resolve(result);
                });
            })
        }
        catch (e){
            console.log(e);
        }
    },

    sendDownlinkMessage: function(EUI, type, dataType, port, data){
        try{
            return new Promise((resolve, reject) => {
                mongoose.connect(dbURI,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    async function(err, db){
                        let downlinkMessage;
                        if (type == "oxobutton"){
                            let msg = ""
                            if (dataType == "image"){
                                //console.log("data len:" + data.length);
                                //console.log(data[0]);
                                //console.log(data[1]);
                                msg = OxobuttonDownlinkGenerator.ConfigureImages(image_epd_mode = 1, image_codes = data);
                            }
                            else if (dataType == "text"){
                                msg = OxobuttonDownlinkGenerator.ConfigureText(user_text_x_pos = 8, user_text_y_pos = 8, user_text_font_size = 24, user_text_state = 0, user_text_chars = data)
                            }
                            else{
                                msg = "default";
                            }
                            downlinkMessage = new DownlinkMessage({
                                cmd: 'tx',
                                EUI: EUI,
                                port: port,
                                confirmed: false,
                                data: msg,
                                appid: process.env.APPID
                            })
                        }
                        downlinkMessage.save().then((result) => {
                            //console.log('saved measurement to db downlink collection:' + result);
                            //mongoose.connection.close();
                            let headers = {
                                "Content-Type":"application/json",
                                "Authorization": process.env.AUTH
                            } 
                            request.post({
                                url: BASE_URL,
                                headers:headers,
                                body: JSON.stringify(downlinkMessage)},
                                (err, response, body) => {
                                //console.log(err, body, response);
                                if (err) {
                                    reject(err);
                                } else{
                                    resolve(body);
                                }
                            })
                            resolve(result);
                        }).catch((err) => {
                            //console.log(downlinkMessage);
                            console.log('something went wrong downlinkMessage');
                            console.log(err);
                            reject(err);
                            //mongoose.connection.close();
                        });
                });
            })
        }
        catch (e){
            console.log(e);
        }
    }
}