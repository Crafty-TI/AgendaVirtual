var express = require('express');
var router = express.Router();
 
//const con = require('../../services/db/conection');



/* GET users listing. */
router.get('/userList', function(req, res, next) {    
let response=[{
  id:1,
  name: 'John',
  lastName:'John',
},
{
  id:2,
  name: 'John',
  lastName:'John',
}];
  res.json(response);     
}); 


//con.end();
module.exports = router;
