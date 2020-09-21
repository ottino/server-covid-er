const jwt = require('jsonwebtoken');

let verificarToken = ( req, res, next ) => {

    let body = req['body'];
    let token = body['token'];

    console.log( 'token', body );

    next();

}

module.exports = {

    verificarToken

};