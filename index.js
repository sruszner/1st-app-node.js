
const express = require('express');
const app = express();
require('dotenv').config();
//const Port = process.env.PORT || 8080;
const hbs = require('hbs');
const mysql = require('mysql2');
const path = require('path');
const nodemailer = require('nodemailer');


// Conectamos la app a una Base de Datos

/*  const conexion = mysql.createConnection({
    host: us-cdbr-east-05.cleardb.net,
    user: bcb2adfad530a2,
    password: 5e1e84ca,
    //port: process.env.PORTDB,
    database: heroku_b94d852201155b2,
})
  */
// Conectamos la Bse de Datos

const conectar = conexion.connect(function (error) {
    if (error) throw error;
    console.log("Conexion a la DB exitosa");
})

/*     const conectar = async({
    await conexion.connect((error) => {
        if(error) throw error;
        console.log('Base de datos conectada!');
    })
})  */

// Configuracion de middlewares 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/', (req, res) => {
    res.render('index', { titulo: 'Home' })
})

app.get('/circuit', (req, res) => {
    res.render('index', { titulo: 'Home' })
})

app.get('/region', (req, res) => {
    res.render('region', { titulo: 'Region' })
})

app.get('/formula', (req, res) => {
    res.render('formula', { titulo: 'Formula One' })
})

app.get('/gt3', (req, res) => {
    res.render('gt3', { titulo: 'GT3' })
})

app.get('/administrator', (req, res) => {
    res.render('administrator')
})

app.get('/drivingexperience', (req, res) =>{
    let sql = "SELECT * FROM usuario";
    let query = conexion.query(sql, (err, results) =>{
        if (err) throw err;
        res.render('drivingexperience', {titulo: 'Contact List',results})
    })
})


app.get('/lmp1', (req, res) => {
    res.render('lmp1', { titulo: 'LMP1' })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { usuario, password, remember } = req.body;
    console.log(usuario);
    console.log(password);
    console.log(remember);
    res.send({ respuesta: "tus datos son correctos" })
})

app.get('/forgot', (req, res) => {
    res.render('forgot')
})

app.post('/forgot', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { emailForgot } = req.body;
    console.log(emailForgot);
    res.send({ respuesta: "Revisa tu email y sigue los pasos para reestablecer la contraseña" })
})

app.get('/reset-pass', (req, res) => {
    res.render('reset-pass')
})

app.post('/reset-pass', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { password, logout_devices } = req.body;
    console.log(password);
    console.log(logout_devices);
    res.send({ respuesta: "Tu constraseña se reestablecio correctamente" })
})


app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { nameRegister, emailRegister, passwordRegister } = req.body;
    console.log(nameRegister);
    console.log(emailRegister);
    console.log(passwordRegister);
    res.send({ respuesta: "REGISTRO OK" })
})

app.get('/contact', (req, res) => {
    res.render('contact', { titulo: 'Contact Us' })
})

app.post('/form-received', (req, res) => {
    console.log(req.body);
    //res.render('form-received');

    // Desestructuramos
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.address);
    console.log(req.body.address2);
    console.log(req.body.country);
    console.log(req.body.state);
    console.log(req.body.zip);
    console.log(req.body.dataStorage);
    console.log(req.body.beContacted);
    console.log(req.body.metOn);
    const { firstName, lastName, username, email, address, address2, country, state, zip, dataStorage, beContacted, metOn } = req.body;
    //conectar();
    let data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        address: address,
        address2: address2,
        country: country,
        state: state,
        zip: zip,
        dataStorage: dataStorage,
        beContacted: beContacted,
        metOn: metOn
    }

    let sql = "INSERT INTO USUARIO SET ?";
    let query = conexion.query(sql, data, (err, results) => {
        if (err) throw err;
        res.render('form-received');
    })
})

// verbo http para recibir datos

app.post('/subscribed', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { emailNewsletter } = req.body;
    console.log(emailNewsletter);

   //res.render('subscribed')
})

app.get('/construction', (req, res) => {
    res.render('construction', { titulo: 'Under construction' })
})

app.get('*', (req, res) => {
    res.render('404.hbs')
});


app.listen(Port, () => {
    console.log(`Servidor corriendo en el puerto ${Port}`);
})

app.on('error', (error) => {
    console.log(`Tenemos un error ${error}`);
})

