const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom:{
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:20,
   

  },
  prenom: {
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:20,
    
  },
  type: {
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:10,
    

},
  email:  {
    type: String,
    required: true,
    trim:true,
    minlength:5,
    maxlength:50,
    unique: true,
   
},
  password: {
    type: String,
    require:true,
    trim:true,
    minlength:8,
    unique: true,

},
}, { collection: 'users' }); // Spécifie le nom de la collection

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
