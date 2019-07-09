const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  playername1: String,
  playername2: String,

  

  winner: String,
  loser: String,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
