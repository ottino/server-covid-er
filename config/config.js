
// ================================
// Puerto
// ================================
process.env.PORT = process.env.PORT || 3000;

// ================================
// Entorno
// ================================
// la establece Heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================================
// Base de datos
// ================================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/covider';
} else {
    urlDB = process.env.MONGO_URI;
    // urlDB = 'mongodb+srv://XXX:XXXX@cluster0.fwzjl.mongodb.net/covider?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;

// ================================
// Vencimiento del Token
// ================================
//  60 segundos
//  60 minutos
//  24 horas
//  30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 700;

// ================================
// SEED de autenticacion (semilla)
// ================================
process.env.SEED = process.env.SEED || 'SEMILLA';
