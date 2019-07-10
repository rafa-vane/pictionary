const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  participants:{ 
    creator: {},
    guest:{}
  },
  winner: String,
  state: {type:String, enum:["active","inactive"], default:"inactive"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
