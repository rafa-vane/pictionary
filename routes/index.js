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
  .then(game => {
    
    res.render('gamePage', {game});
  })
  
})

router.post("/gamePage",(req, res, next) => {
  User.findOne({username: req.body.guest})
  .then((guest) => {
    Game
    .create({
      participants:{ 
        creator: req.user,
        guest: guest
      },
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
