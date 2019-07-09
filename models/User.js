const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  games:{
    totalGames: Number,
    wins: Number,
    defeats:Number,
  },
  picture: {  
    title: String,
    description: String,
    imgName: String,
    imgPath: String,}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
