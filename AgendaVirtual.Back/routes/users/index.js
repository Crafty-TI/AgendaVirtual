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

/*  users Insert. */
router.post('/userInsert',(req,res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const mail = req.body.mail;
  const tel = req.body.tel;
  const rol = req.body.rol;
  const sqlInsert = "INSERT INTO usuarios (nombre, apellido, mail, tel, rol_id) VALUES (?,?,?,?,?)"
  con.query(sqlInsert,[nombre,apellido,mail,tel,rol], (err,result) =>{
    return res.json(result);
  })
  con.end();
})

/*  users Update. */
router.put('/userUpdate',(req,res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const mail = req.body.mail;
  const tel = req.body.tel;
  const rol = req.body.rol;
  const sqlUpdate = "UPDATE usuarios SET nombre = ?, apellido = ?, mail = ?, tel = ?, rol_id = ? WHERE id = ?"
  con.query(sqlUpdate, [nombre,apellido,mail,tel,rol,id], (err,result) => {
      return res.json(result);
    })
})

/* Desactivar usuario. */
router.put('/userDelete',(req,res) => {
  const id = req.body.id;
  const sqlUpdate = "UPDATE usuarios SET activo = 'no' WHERE id = ?"
  con.query(sqlUpdate,[id], (err,result) => {
      return res.json(result);
    })
})
module.exports = router;
