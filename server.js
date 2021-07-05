const express = require ("express");
const path = require ("path");
const cors = require ("cors");
const bodyParser = require ("body-parser");
const ejs = require ("ejs");


var nodemailer = require ("nodemailer")




const app = express ();
const PORT = 3000;

app.set ("view engine", "ejs");

//Usa archivos estaticos
app.use (express.static(path.join(__dirname, "/views")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//solo en Desarrollo- cors= para acceder al back end independientemente del dispositivo que lo este corriendo.
app.use(cors());


app.get("/", function (req, res) {
});

app.get("/login", function (req, res) {
    return res.render("login");
});

app.post ("/login", function (req, res) {
});


//Entramos en el formulario de Mail
/*
var trasnporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: "s21.caceres@gmail.com",
    pass: "santicaceres2004"
}});

app.get("/mail",function (req,res) {
    var Mailoption = {
        from: "s21.caceres@gmail.com",
        to:"s21.caceres@gmail.com",
        subject: "Mail comunication",
        text: req.query.body
    }});

trasnporter.sendMail(Mailoption, function (error,info) {
    if (error) {
        console.log("error")
        res.estatus(500).send(error.message)
    } else {
        console.log ("Mail Enviado")
        res.estatus(200).json(req.body) 
    }
    }
);

*/
//contacto
/*
app.get("/contacto",function (req,res) {
    var MailOption = {
        from: "s21.caceres@gmail.com",
        to:"s21.caceres@gmail.com",
        subject: "Mail comunication",
        text: req.query.body
    }});

trasnporter.sendMail(MailOption, function (error,info) {
    if (error) {
        console.log("error")
        res.estatus(500).send(error.message)
    } else {
        console.log ("Email sent: " + info.response)
        res.estatus(200).json(req.body) 
    }
    }
);
*/
app.listen(PORT, function () {
    console.log("El servidor quedo corriendo en el puerto ${PORT]")
});