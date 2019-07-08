require('dotenv');
const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/userPage', (req, res, next) => {
  res.render('userPage', { user: req.user });
});

router.get(('/game-page'),(req, res, next) =>{
  res.render('game-page');
})

// router.post("/game-page"),(req, res, next) => {
//   Game
//   .create({
    
//   })
//   .then(()=>{
//      res.render("/game-page")
//   })
//   .catch((err) =>console.log(err))

// }




module.exports = router;
