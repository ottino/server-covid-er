const fs = require('fs');

let linkImagenes = [];

const cargarDB = () => {

    try{
        linkImagenes = require('../db/minsaer-immg-db.json');
    } catch (e) {
        linkImagenes = [];
    }

};

const guardarDB = () => {

    let data = JSON.stringify( linkImagenes );

    fs.writeFile('db/minsaer-immg-db.json' , data , (e) => {
        if (e) throw new Error('Error al grabar',err);
    });

};

const crearItem = ( link , fecha ) => {

    cargarDB();

    let item = {
        link,
        fecha
    };

    linkImagenes.push( item );

    guardarDB();

    return item;

};

const getItems = () => {

    cargarDB();
    return linkImagenes;

};

const borrar = ( fecha ) => {

    cargarDB();
    let nuevolinkImagenes = [];
    let verifica = 0;

    linkImagenes.findIndex( item => {

        if ( item.fecha != fecha ) {

            nuevolinkImagenes.push( item );
            linkImagenes = nuevolinkImagenes;

        } else {

            verifica = 1;

        }

    });

    if ( verifica == 1 )
    {
        guardarDB();
        return true;
    } else {
        return false;
    }

};


module.exports = {

    cargarDB,
    guardarDB,
    crearItem,
    getItems,
    borrar

}