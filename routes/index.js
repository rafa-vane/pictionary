const express = require('express');
const router = express.Router();
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
