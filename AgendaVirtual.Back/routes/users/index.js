var express = require('express');
var router = express.Router();
 
const con = require('./connectMySQL');



/* GET users listing. */
router.get('/', function(req, res, next) {   
let response;
  con.query("select * from user", function (err, result, fields) {
    if (err) throw err;
    let result
    console.log(result);
});

  res.json(result);     

}); 


con.end();
module.exports = router;
