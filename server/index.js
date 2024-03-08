const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;
const cors = require('cors');
app.use(express.json());
app.use(cors());


const userRoute = require('./Routes/userRoute.js');
app.use('/', userRoute);

mongoose.connect('mongodb://localhost:27017/mernDb',{
 //useNewUrlParser: true, 
  //useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connexion à la base de données réussie');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})