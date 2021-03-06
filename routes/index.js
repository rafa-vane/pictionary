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
      { word: "Playa", definition: "Extensión casi plana de arena o piedras en la orilla del mar, de un río o de un lago." },
      { word: "Ordenador Portátil", definition: "Ordenador personal de peso y tamaño tan reducidos que se puede llevar cómodamente de un lado a otro, como si fuera un maletín; una batería incorporada le permite cierta autonomía de funcionamiento" },
      { word: "Tapir", definition: "Mamífero de aspecto similar al jabalí, de unos 2 m de longitud y pelaje corto y fino de color castaño uniforme o bien negro con el lomo y el vientre blanquecinos; tiene el hocico prolongado en forma de una pequeña trompa, patas con pezuñas (4 en las delanteras y 3 en las traseras) y cola gruesa muy corta; es herbívoro, nocturno y solitario, y vive en Asia y América del Sur y Central." },
      { word: "mono", definition: "Nombre genérico con que se designa a cualquiera de los primates del suborden de los antropoides (hocico reducido y ojos en posición frontal)." },
      { word: "pelota", definition: "Bola generalmente hecha de cuero, goma u otro material flexible, llena de aire o maciza, que se utiliza para jugar o para practicar determinados deportes." },
      { word: "programador", definition: "Persona que se dedica a elaborar programas informáticos" },
      { word: "pulga", definition: "Insecto de unos 3 mm de longitud, de cuerpo grueso, color negro rojizo, sin alas, provisto de unas patas traseras muy fuertes y largas con las que da grandes saltos; vive como parásito de los mamíferos y las aves, de los que chupa su sangre para alimentarse, produciéndoles molestas picaduras." },
      { word: "lengua", definition: "Órgano muscular muy movible que se encuentra fijado por su parte posterior en el interior de la boca de los vertebrados; en los seres humanos, interviene en el gusto, en la masticación y deglución de los alimentos y en la articulación de los sonidos de la voz." },
      { word: "poni", definition: "Caballo de poca alzada (hasta unos 140 cm), ágil y fuerte; hay muchas razas diferentes." },
      { word: "buda", definition: "Estatua que representa a Buda." }
    ]
  

  return new Promise((resolve, reject) => {
    let theWord = words[getRandomInt(0, words.length - 1)]
    resolve(theWord)
  })

}


router.get("/gameDetails/:id", (req, res) => {
  Game
    .findById(req.params.id)
    .then(gameDetails => res.json(gameDetails))
})

router.get("/gameImageData/:id", (req, res) => {
  Game
    .findById(req.params.id)
    .then(gameDetails => res.json(gameDetails.imgGame))
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

router.post("/canvasImg/:idImg", (req, res, next) => {
  console.log((Object.keys(req.body))[0])
  Game.findByIdAndUpdate(req.params.idImg, { imgGame: req.body.imageData }, { new: true })
    .then((fotos) => {
      console.log(fotos)
      res.json({imagePayloadUpdated: true, timestamp: new Date()})
    }).catch((err) => console.log(err))
});







module.exports = router;
