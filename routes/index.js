const express = require('express');
const router = express.Router();
const unirest = require('unirest')    
const Game = require("../models/Game");
const User = require("../models/User");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/userPage', (req, res, next) => {
  res.render('userPage', { user: req.user });
});

router.get(('/gamePage/:id'), (req, res, next) => {
  Game
    .findById(req.params.id)
    .populate('creator')
    .populate('guest')
    .then(game => {
      console.log(game)
      res.render('gamePage', { game });
    })  
    .then((game)=> {
      unirest.get("https://wordsapiv1.p.rapidapi.com/words/?random=true")
    .header("X-RapidAPI-Host", process.env.X_RAPIDAPI_HOST)
    .header("X-RapidAPI-Key", process.env.X_RAPIDAPI_KEY)
    .end(function (result) {
      console.log(result.body.word);
    });
    })

})



router.post("/gamePage", (req, res, next) => {
  User.findOne({ username: req.body.guest })
    .then((guest) => {
      let invited = guest._id;
      let creator = req.user._id
      Game
        .create({
          creator: req.user._id,
          guest: guest._id,
          winner: ""
        })
        .then(created => {
          let gameId = created._id
          User.findByIdAndUpdate(creator, { $push: { createdGames: gameId } }, { new: true })
            .then(creator => {
              User.findByIdAndUpdate(invited, { $push: { invitedGames: gameId } }, { new: true })
                .then(paco => {
                  res.redirect(`gamePage/${gameId}`)
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
});




module.exports = router;
