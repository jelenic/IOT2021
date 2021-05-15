const express = require('express');
//const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
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

app.get('/testJWT', authenticateToken, (req, res) => {
    res.send('testJWT');
})


app.listen(port, () => {
    console.info('server started on port: ' + port);
})

//import this function from authService imas kopiju funkcije rip 6:00 kodiranje   min 15
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        return 401;
    }

    jwt.verify(token, 'nestostabitrebaocitkljuc', (err,user) => {
        console.log('inside verifyJWT');
        if (err){
            return 403;
        }
        else{
            req.user = user;
            next();
        }
    })
}


//connection with mongodb via user readWrite    pass: rKsnW2pPLafbHHz
// mongodb link     mongodb+srv://readWrite:<password>@nodeloraapp.rguzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
