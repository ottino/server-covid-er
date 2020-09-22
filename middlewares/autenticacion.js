const jwt = require('jsonwebtoken');

let verificarToken = ( req, res, next ) => {

    let body = req['body'];
    let token = body['token'];
    console.log({token});

    jwt.verify( token , process.env.SEED , (err, decoded) => {


        if ( err ) {

            return res.status(401).json({
                ok:false,
                err: {
                    error: err,
                    message: 'Token no válido'
                }
            });

        }

        req.usuario = decoded.usuario;

        next();
    });
}

module.exports = {

    verificarToken

};