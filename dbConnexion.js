const mongoose = require('mongoose')
require('dotenv/config');
mongoose.set('strictQuery',true);
console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', (err) => {
    console.error('Erreur de connexion : ' + err);
  });
  
  db.once('open', () => {
    console.log('Connexion réussie');
  });

module.exports = mongoose;