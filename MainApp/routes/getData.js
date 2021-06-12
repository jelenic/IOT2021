const express = require('express');
const getDataCtrl = require('../controllers/getData');
//const authService = require('../services/authService');
const tokenService = require('../services/verifyToken');

const router = express.Router();
module.exports = router;

router.route('/').get((req,res)=>{
    res.send('getData default');
})

router.get('/EUI/:EUI',tokenService.authenticateToken, getDataCtrl.returnAllMessagesWithEUI);
router.get('/sensors/:username',tokenService.authenticateToken, getDataCtrl.returnAllSensorsWithUser);

router.post('/downlink',tokenService.authenticateToken, getDataCtrl.sendDownlinkMessage);


module.exports = router;