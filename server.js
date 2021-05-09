const express = require('express');
//const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const port = /*process.env.SERVER_PORT ||*/ 4000;
const dbURI = 'mongodb+srv://readWrite:<rKsnW2pPLafbHHz>@nodeloraapp.rguzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const {json, urlencoded} = express;



const app = express();
const routes = require('./routes/index');
app.use(cors());

app.use(json());
app.use(urlencoded({extended: false}));
app.use('/api/', routes);

/*app.use('/',(req,res)=>{
    res.send('test')
})*/




app.listen(port, () => {
    console.info('server started on port: ' + port);
})




//connection with mongodb via user readWrite    pass: rKsnW2pPLafbHHz
// mongodb link     mongodb+srv://readWrite:<password>@nodeloraapp.rguzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
