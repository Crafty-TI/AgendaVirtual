var express = require('express');
var router = express.Router();
const con = require('../../services/db/conection');

/* GET Events listing. */
router.get('/eventList/:usuarioId', (req, res, next) => {  
  const usuarioId = req.params.usuarioId;
  const sqlSelect = "SELECT id, title, allDay, reservado, date_format(start,'%Y-%m-%d %H:%i:%s') as start, date_format(end,'%Y-%m-%d %H:%i:%s') AS end FROM calendar.eventos where activo='si' and idUsuario=?;"
  con.query(sqlSelect,usuarioId,(err,result) => {
    return res.json(result);  
  })
}); 


router.post('/eventInsert',(req,res) => {
  const title=req.body.title;
  const allDay=req.body.allDay;
  const start=req.body.start;
  const end=req.body.end;
  const sqlInsert = "INSERT INTO eventos  (title,allDay,start,end,activo,idUsuario,reservado)  VALUES  (?,?,?,?,'si',1,0);"
  con.query(sqlInsert,[title,allDay,start,end],(err,result) => {
      return res.json(result);    
   })
});

router.get('/eventoEditList/:eventoId', (req, res, next) => {   
  const id = req.params.eventoId;
  const sqlSelect = "SELECT id, title, allDay, date_format(start,'%Y-%m-%d %H:%i:%s') as start, date_format(end,'%Y-%m-%d %H:%i:%s') AS end FROM calendar.eventos where id = ?"
  con.query(sqlSelect,id,(err,result) =>{
    return res.json(result);  
    
  })
}); 

router.put('/eventoUpdate',(req,res) => {
  const id = req.body.id;
  const title = req.body.title;
  const allDay = req.body.allDay;
  const start = req.body.start;
  const end = req.body.end;
  const sqlUpdate = "UPDATE eventos SET title = ?, allDay = ?, start = ?, end = ? WHERE id = ?"
  con.query(sqlUpdate, [title,allDay,start,end,id], (err,result) => {
      return res.json(result);
    })
})

router.put('/eventoDelete',(req,res) => {
  const id = req.body.id;
  const sqldelete = "UPDATE eventos set activo='no' where id = ?"
  con.query(sqldelete,id,(err,result) => {
    return res.json(result)
  })
})

router.put('/eventoReservar',(req,res) => {
  console.log("Dentro de la reservación")
  const id = req.body.id;
  console.log(req.body)
  const sqldelete = "UPDATE eventos set reservado=1 where id = ?"
  con.query(sqldelete,id,(err,result) => {
    return res.json(result)
  })
})
module.exports = router;
