const express = require('express');
const app     = express();
const driver  = require('../controlador/driver') ;
const Link    = require('../models/link');

app.get('/', (req, res)=>{

    let items = driver.getItems();
    //items.push( req.url );
    res.send( items );

});

// app.post('/agregar', function(req, res) {

//      console.log(JSON.stringify(req.body));

//      let parametros = req.query;

//      driver.crearItem( parametros['link'] , parametros['fecha'] );

//      res.send(  parametros  );
// });

app.delete('/delete', function(req, res) {

    console.log(JSON.stringify(req.body));

    let parametros = req.query;

    let base = driver.borrar( parametros['fecha'] );

    res.send(  base  );
});

app.post('/link', function (req,res) {

    let body = req.body; // pasa por el bodyParser

    let link = new Link({ 
        fecha      : body.fecha,
        link       : body.link
    });

    link.save( ( err, linkDB ) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            link: linkDB
        });

    });

});


module.exports = app;