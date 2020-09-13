
const mongoose = require('mongoose');

let Schemma = mongoose.Schema;

let linkSchema = new Schemma({
    link: {
        type: String,
        required: [true, 'El link es obligatorio']
    },
    fecha: {
        type: String,
        unique:true,
        required: [true, 'La fecha es obligatoria']
    }
});


module.exports = mongoose.model( 'Link', linkSchema );

