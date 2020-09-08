// const argv = require('yargs').options({
//     fecha: {
//         alias: 'f',
//         desc: 'Fecha del reporte',
//         demand: true
//     },
//     link: {
//         alias: 'l',
//         desc: 'Link de descarga de la imagen en Ministerio de Salud ER.',
//         demand: true
//     }
// }).argv;

const argv = require('yargs')
    .command('cargar','Cargar info. a la base de datos',{
            fecha: {
                alias: 'f',
                desc: 'Fecha del reporte',
                demand: true
            },
            link: {
                alias: 'l',
                desc: 'Link de descarga de la imagen en Ministerio de Salud ER.',
                demand: true
            }
    })
    .command('eliminar','Eliminar un item de la base de datos',{
        fecha: {
            demand: true,
            alias: 'e',
            desc: 'Elimina un item de la base de datos'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}