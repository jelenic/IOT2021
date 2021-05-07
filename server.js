const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = /*process.env.SERVER_PORT ||*/ 4000;
const {json, urlencoded} = express;



const app = express();
const routes = require('./routes/index');
app.use(cors());
app.use('/api/', routes);

app.use(json());
app.use(urlencoded({extended: false}));
app.use(routes);

app.use('/',(req,res)=>{
    res.send('test')
})




app.listen(port, () => {
    console.info('server started on port: ' + port);
})
