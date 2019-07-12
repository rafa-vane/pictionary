const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  guest: { type: Schema.Types.ObjectId, ref: "User" },
  winner: String,
  state: { type: String, enum: ["active", "inactive", "finished"], default: "inactive" },
  imgGame: String,
  randomThing: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
