const express = require('express');
const getDataCtrl = require('../controllers/getData');

const router = express.Router();
module.exports = router;

router.route('/').get((req,res)=>{
    res.send('getData default');
})

router.get('/EUI/:EUI', getDataCtrl.returnAllMessagesWithEUI);


module.exports = router;