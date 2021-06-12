const sensorService = require('../services/sensorService');

module.exports = {
    addSensor: (req, res) => {
        sensorService.addSensor(req.body.EUI,req.body.type,req.body.user,req.body.desc).then((data) => {
            //console.log("log ctrl:" + data);
                    res.json({data : data});
            }).catch((err) => {
                res.json({err : err.message});
        })
    }


};