const express = require('express');
const app     = express();
const driver  = require('../controlador/driver') ;
const Link    = require('../models/link');

app.get('/', (req, res)=>{

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Link.find({ /*estado: true*/ }, 'fecha link')
        .skip(desde)
        .limit(limite)
        .exec( (err, links) => {

                    if ( err ) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }

                    Link.count({ /*estado: true*/  }, (err, conteo)=> {


                        res.json({
                            ok:true,
                            links,
                            cantidad: conteo
                        });

                    });

                });

});

app.delete('/link/:id', function (req,res) {

    let id = req.params.id;

    // Boorado fisico
    Link.findByIdAndRemove(id , (err, linkBorrado) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if ( linkBorrado == null ){

            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Link no encontrado'
                }
            });

        }

        res.json({
            ok:true,
            link: linkBorrado
        })

    });


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