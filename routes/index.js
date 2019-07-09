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

router.get(('/gamePage'),(req, res, next) =>{

  res.render('gamePage');
})

// router.post("/gamePage"),(req, res, next) => {
//   Game
//   .create({
    
//   })
//   .then(()=>{
//      res.render("/gamePage")
//   })
//   .catch((err) =>console.log(err))

// }


module.exports = router;
