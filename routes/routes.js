const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const driver  = require('../controlador/driver') ;
const Link    = require('../models/link');
const User    = require('../models/user');

// middlewares propios
const { verificarToken } = require('../middlewares/autenticacion');

const app     = express();

app.post('/user', (req, res) => {

    let body = req.body; // pasa por el bodyParser

    let user = new User({
        nombre  : body.nombre,
        email   : body.email,
        password: bcrypt.hashSync( body.password , 10),
    });

    user.save( (err, userDB) => {

        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            user: userDB
        });
    });

});


app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email } , (err, userDB) => {

        if (err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if ( !userDB ) {
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if ( !bcrypt.compareSync(body.password , userDB.password ) ) {
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        let token = jwt.sign(
            {usuario:userDB},// payload
            process.env.SEED,
            { expiresIn: process.env.CADUCIDAD_TOKEN}
        )

        res.json({
            ok:true,
            usuario: userDB,
            token
        });


    })


});

app.get('/', (req, res)=>{

    Link.find({ /*estado: true*/ }, 'fecha link')
        .exec( (err, links) => {

            if ( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok:true,
                links
            });

        });

});

app.delete('/link/:id', verificarToken , function (req,res) {

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

app.post('/link', verificarToken , function (req,res) {

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