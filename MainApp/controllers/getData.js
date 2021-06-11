const getDataService = require('../services/getDataService');

module.exports = {
    returnAllMessagesWithEUI: (req, res) => {
        console.log(req.params.EUI);
        getDataService.returnAllMessagesWithEUI(req.params.EUI).then((data) => {
            console.log("log ctrl:" + data);
                res.json({data : data});
            }).catch((err) => {
                res.json({err : err.message});
        })
    },
    returnAllSensorsWithUser:(req, res) => {
        console.log(req.params.username);
        getDataService.returnAllSensorsWithUser(req.params.username).then((data) => {
            console.log("log ctrl:" + data);
                res.json({data : data});
            }).catch((err) => {
                res.json({err : err.message});
        })
    },
    sendDownlinkMessage: (req, res) => {
        console.log(req.params.EUI);
        getDataService.sendDownlinkMessage(req.body.EUI, req.body.type, req.body.dataType, req.body.port, req.body.data).then((data) => {
            console.log("log ctrl:" + data);
                res.json({data : data});
            }).catch((err) => {
                res.json({err : err.message});
        })
    }


};