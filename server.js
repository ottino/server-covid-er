const express = require('express');
const app = express();
const driver = require('./controlador/driver') ;

// Si no existe va 6969. conf para utilizar Heroku
const puerto = process.env.PORT || 6969;

app.get('/', (req, res)=>{

    let items = driver.getItems();
    //items.push( req.url );
    res.send( items );

});

app.post('/agregar', function(req, res) {

     console.log(JSON.stringify(req.body));

     let parametros = req.query;

     driver.crearItem( parametros['link'] , parametros['fecha'] );

     res.send(  parametros  );
});

app.delete('/delete', function(req, res) {

    console.log(JSON.stringify(req.body));

    let parametros = req.query;

    let base = driver.borrar( parametros['fecha'] );

    res.send(  base  );
});

app.listen(puerto, 
    ()=> console.log(`Escuchando el puerto ${ puerto }`) );
