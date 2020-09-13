
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