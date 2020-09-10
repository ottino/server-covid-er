const fs = require('fs');

let linkImagenes = [];

const cargarDB = () => {

    try{
        linkImagenes = require('../db/minsaer-immg-db.json');
    } catch (e) {
        linkImagenes = [];
    }

    console.log('cargarDB: Base cargada con exito');

};

const guardarDB = () => {

    let data = JSON.stringify( linkImagenes );

    fs.writeFile('db/minsaer-immg-db.json' , data , (e) => {
        if (e) throw new Error('Error al grabar',err);
    });

    console.log('guardarDB: Base guardada con exito');

};

const crearItem = ( link , fecha ) => {

    cargarDB();

    let item = {
        link,
        fecha
    };

    linkImagenes.push( item );

    guardarDB();

    console.log('crearItem: Item cargado con exito');
    return item;

};

const getItems = () => {

    cargarDB();
    return linkImagenes;

};

const borrar = ( fecha ) => {

    cargarDB();

    let nuevolinkImagenes = [];
    let fecha_if = fecha.replace(/"/g,'');


    linkImagenes.findIndex( item => {

        if ( item.fecha != fecha_if ) {

            console.log( item );

            nuevolinkImagenes.push( item );

        };

    });

    linkImagenes = nuevolinkImagenes;

    guardarDB();

    console.log('borrar: Item borrado exito');

    return linkImagenes;

};


module.exports = {

    cargarDB,
    guardarDB,
    crearItem,
    getItems,
    borrar

}