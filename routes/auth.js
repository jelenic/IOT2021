const express = require('express');
const authCtrl = require('../controllers/auth');

const router = express.Router();
module.exports = router;

router.route('/').get((req,res)=>{
    res.send('auth default');
})

router.route('/register').get((req,res) => {
    //res.send('register get test');
    msg = 'register get test';
    res.json({msg});
});

router.post('/register', authCtrl.register);

module.exports = router;