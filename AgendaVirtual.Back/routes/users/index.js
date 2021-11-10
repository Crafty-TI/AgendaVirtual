var express = require('express');
var router = express.Router();
const con = require('../../services/db/conection');

/* GET users listing. */
router.get('/userList', (req, res, next) => {   
  const sqlSelect = "SELECT * FROM Usuarios where activo IS NULL"
  con.query(sqlSelect,(err,result) =>{
    return res.json(result);  
  })
}); 

/*  users Insert. */
router.post('/userInsert',(req,res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const mail = req.body.mail;
  const tel = req.body.tel;
  const rol = req.body.rol_id;
  const password = req.body.password;
  const sqlInsert = "INSERT INTO usuarios (nombre, apellido, mail, tel, rol_id, password) VALUES (?,?,?,?,?,?)"
  con.query(sqlInsert,[nombre,apellido,mail,tel,rol,password], (err,result) =>{
    return res.json(result);
  })
})


/*  users Update. */
router.put('/userUpdate',(req,res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const mail = req.body.mail;
  const password = req.body.password;
  const tel = req.body.tel;
  const rol_id = req.body.rol_id;
  const sqlUpdate = "UPDATE usuarios SET nombre = ?, apellido = ?, mail = ?, tel = ?, rol_id = ?, password = ? WHERE id = ?"
  con.query(sqlUpdate, [nombre,apellido,mail,tel,rol_id,password,id], (err,result) => {
      return res.json(result);
    })
})

/* Desactivar usuario. */
router.put('/userDelete',(req,res) => {
  const id = req.body.userId;
  const sqlUpdate = "UPDATE usuarios SET activo = 'no' WHERE id = ?"
  con.query(sqlUpdate,[id], (err,result) => {
      return res.json(result);
    })
})

//Listar usuario a Editar
router.get('/userEditList/:usuarioId', (req, res, next) => {   
  const id = req.params.usuarioId;
  const sqlSelect = "SELECT * FROM Usuarios where id = ?"
  con.query(sqlSelect,id,(err,result) =>{
    return res.json(result);  
    
  })
}); 

//Login
router.put('/login', (req,res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  const sqlLogin = "SELECT * FROM Usuarios WHERE mail = ? AND password = ?"
  con.query(sqlLogin, [mail,password],(err,result) =>{
    console.log("longitud",result.length)
    if (result.length>0) {
      return res.json(result);
    }
    else{
      return res.json({message:'Usuario o contraseña incorrecto'})
    }
  })
});

module.exports = router;