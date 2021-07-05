const express = require ("express");
const bcrypt = require ("bcrypt")
const jwt = require('jsonwebtoken');

const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');

const ruter = express.router();

router.get("/", (req,res) => {
    res.json({succes: true });
});

// Entramos en Register 

router.post("/register", async (req,res) => {

    if(req.body.name && req.body.mail && req.body.password) {

//Aca verificamos si la expresion regular (formato mail) es valida
if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
    res.status(400).json({ success: false, message: "El mail es incorrecto" });
    return
  }

  // Fijarme que el mail  no exista 
  const existeUser = usuarios.find((u) => {
    return u.mail === req.body.mail;
  });

  if (existeUser) {
    res.status(400).json({ success: false, message: 'Mail repetido' });
    return
  }

  // Encriptar contrase;a, para que no la entregue plana.
  const salt = await bcrypt.genSalt(15);
  const password = await bcrypt.hash(req.body.password, salt);


    const newUser = {
        name: req.body.name,
        mail: req.body.mail,
        password: password
    }
    usuarios.push(newUser)

    res.json({ succes: true, newUser,});
}
else {
    res.status(400).json({ succes: false, massage: "Faltan datos (Name, Mail, Password"});
}
})
module.exports = router;


//Ahora entramos en el LOGIN

router.post('/login', async (req, res) => {
  
    // Buscamos el usuario 
    const user = usuarios.find((u) => u.mail === req.body.mail);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña no válida' });
    }
  
    // Crear el token
    const token = jwt.sign({
      name: user.name,
      mail: user.mail
    }, TOKEN_SECRET);
  
    res.json({ error: null, data: 'Login exitoso', token });
  });
  
  //Listar usuarios solo puede ser consumida por alguien autorizado
  router.get('/usuarios', verifyToken, (req, res) => {
    
    // Podemos acceder a los datos del usuario que hizo la request
    // Segun el JWT que envio en los headers de la request
    console.log(req.user);
  
    res.json({ error: null, usuarios });
  });

const usuarios = [
    {
    "name": "nombre",
    "mail": "mail@ejemplo.com",
    "password": "pass"
    }];