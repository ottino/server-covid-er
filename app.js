const argv = require('./config/yargs').argv;
const driver = require('./controlador/driver') ;


let comando = argv._[0];

switch ( comando ) {

    case 'cargar':

        driver.crearItem( argv.link , argv.fecha );
        break;

    case 'eliminar':

        let borrado = driver.borrar( argv.fecha );

        if ( borrado )
            console.log('Registro eliminado');
        else console.log('No se encontraron registros para eliminar');

        break;

    case 'listar':

        console.log (driver.getItems());
        break;

    default:
        console.log('Comando no reconocido.');

        break;
}