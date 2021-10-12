var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource Agenda');
});

router.post('/Add', (req, res,)=> {
  const name=req.body.name;
  //inset to table
})

module.exports = router;
