const express = require('express');
const sensorCtrl = require('../controllers/sensor');

const router = express.Router();
module.exports = router;

router.route('/').get((req,res)=>{
    res.send('sensor default');
})

router.route('/add-sensor').get((req,res) => {
    //res.send('register get test');
    msg = 'addsensor get test';
    res.json({msg});
});


router.post('/add-sensor', sensorCtrl.addSensor);


module.exports = router;