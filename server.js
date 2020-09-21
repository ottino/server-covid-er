require('./config/config');

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

// Rutas Get Post Put Delete
app.use( require('./routes/routes') );

mongoose.connect(process.env.URLDB,
    {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(process.env.PORT,
    ()=> console.log(`Escuchando el puerto ${ process.env.PORT }`) );
