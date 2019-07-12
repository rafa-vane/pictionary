const express = require('express');
const router = express.Router();
const unirest = require('unirest')
const Game = require("../models/Game");
const User = require("../models/User");



router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/userPage', (req, res, next) => {

  Game
    .find({ _id: req.user.invitedGames })
    .populate("creator")

    .then((allGamesInvited) => {
      res.render('userPage', { user: req.user, allGamesInvited })

    })
});

router.get(('/gamePage/:id'), (req, res, next) => {
  Game
    .findById(req.params.id)
    .populate('creator')
    .populate('guest')
    .then(game => {
      console.log('ritaaaaaaa')
      console.log(game)
      getRandomWord()
        .then((data) => {
          game.currentUserIsTheCreatorOfThisGame = false
          game.currentUserIsTheGuestOfThisGame = false
          if (game.creator._id.toString() === req.session.passport.user.toString()) {
            game.currentUserIsTheCreatorOfThisGame = true
          } else {
            game.currentUserIsTheGuestOfThisGame = true
          }
          res.render('gamePage', { game, data });
        })
    }).catch(err => console.log(err))
})

router.get("/randomWord", (req, res) => {
  getRandomWord().then(randomWord => res.json(randomWord))
})

getRandomWord = () => {
  /*

return unirest.get("https://wordsapiv1.p.rapidapi.com/words/?random=true")
    .header("X-RapidAPI-Host", process.env.X_RAPIDAPI_HOST)
    .header("X-RapidAPI-Key", process.env.X_RAPIDAPI_KEY)

    .then((result) => {
      if (result.body.results) {
        console.log("results")
        let object = result.body.results[0]
        let word = result.body.word
        let definition = object.definition
        console.log({ word: word, definition: definition })

        return { word: word, definition: definition }
      } else {
        console.log("results false")
        getRandomWord()
      }
    })

  */

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var words = [
    { word: "test1", definition: "xxxx" },
    { word: "test2", definition: "xxxx" },
    { word: "test3", definition: "xxxx" },
    { word: "test4", definition: "xxxx" },
    { word: "test5", definition: "xxxx" }
  ]

  return new Promise((resolve, reject) => {
    let theWord = words[getRandomInt(0, words.length - 1)]
    resolve(theWord)
  })

}

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

router.post("/canvasImg/:idImg", (req, res, next) => {
  //console.log((Object.keys(req.body))[0])
  Game.findByIdAndUpdate(req.params.idImg, { imgGame: (Object.keys(req.body))[0] }, { new: true })
    .then((fotos) => {
      //console.log(fotos.imgGame)
    }).catch((err) => console.log(err))
});







module.exports = router;
