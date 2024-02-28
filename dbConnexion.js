const mongoose = require('mongoose')
require('dotenv/config');
mongoose.set('strictQuery',true);
console.log(process.env.DB_URL)

mongoose.connect("mongodb+srv://Meanm1db:MirantsoaSaotra@cluster0.lb6lr6y.mongodb.net/MEAN_BeautySalon", {
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