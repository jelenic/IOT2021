const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const port = process.env.SERVER_PORT /*|| 4000*/;
const {json, urlencoded} = express;



const app = express();
const routes = require('./routes/index');
app.use(cors());

app.use(json());
app.use(urlencoded({extended: false}));
app.use('/api/', routes);


app.listen(port, () => {
    console.info('server started on port: ' + port);
    //console.log(process.env.DBLINK);
})
