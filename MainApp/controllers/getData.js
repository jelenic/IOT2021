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
    }


};