const express = require('express');

const router = express.Router();

router.route('/').get((req,res)=>{
    res.send('user default');
})

router.route('/register').get((req,res) => {
    //res.send('register get test');
    msg = 'register get test';
    res.json({msg});
});

module.exports = router;