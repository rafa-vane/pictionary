const express = require('express');
const router  = express.Router();
const Game = require("../models/Game");
const User = require("../models/User");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/userPage', (req, res, next) => {
  res.render('userPage', { user: req.user });
});

router.get(('/gamePage/:id'),(req, res, next) =>{
  Game
  .findById(req.params.id)
  .then(gameInfo => {
    res.render('gamePage', gameInfo);
  })
  
})

router.post("/gamePage",(req, res, next) => {
  User.findOne({username: req.body.player2})
  .then((player2) => {
    Game
    .create({
      player1: req.user,
      player2: player2, 
      winner: ""   
    })
    .then(game =>{
       res.redirect(`gamePage/${game._id}`)
    })
    .catch((err) =>console.log(err))
  })
  .catch((err) =>console.log(err))
});


module.exports = router;
