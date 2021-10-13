var express = require('express');
var router = express.Router();
 
const con = require('../../services/db/conection');



/* GET users listing. */
router.get('/userList', (req, res, next) => {   
  const sqlSelect = "SELECT * FROM Usuarios"
  con.query(sqlSelect,(err,result) =>{
    return res.json(result);  
  })
  con.end();
    
  
}); 

module.exports = router;
