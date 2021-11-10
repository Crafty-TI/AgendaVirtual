var express = require('express');
var router = express.Router();
const con = require('../../services/db/conection');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource Agenda');
});

router.post('/Add', (req, res,)=> {
  const name=req.body.name;
  //inset to table
})

/* GET Events listing. */
router.get('/eventList', (req, res, next) => {   
  const sqlSelect = "SELECT id, title, allDay, date_format(start,'%Y-%m-%d %H:%i:%s') as start, date_format(end,'%Y-%m-%d %H:%i:%s') AS end FROM calendar.eventos;"
  con.query(sqlSelect,(err,result) =>{
    return res.json(result);  
  })
}); 

module.exports = router;
