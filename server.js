require('./config/config');

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

// Rutas Get Post Put Delete
app.use( require('./routes/routes') );

// puerto 27017 puerto de mongo
mongoose.connect('mongodb://localhost:27017/covid_er', (err , res)=>{
    if ( err ) throw new err;
    console.log('Base de datos [ONLINE]');
});


app.listen(process.env.PORT,
    ()=> console.log(`Escuchando el puerto ${ process.env.PORT }`) );
