
const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 8080;
const hbs = require('hbs');
const mysql = require('mysql2');
const path = require('path');
const nodemailer = require('nodemailer');


// Conectamos la app a una Base de Datos

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
})

// Conectamos la Bse de Datos

    conexion.connect(function(error){
    if(error) throw error;
    console.log("Conexion a la DB exitosa");
}) 

/*  const conectar = async({
    await conexion.connect((error) => {
        if(error) throw error;
        console.log('Base de datos conectada!');
    })
}) */ 


// Configuracion de middlewares 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/', (req, res) =>{
    res.render('index', {titulo: 'Home'})
})

app.get('/circuit', (req, res) =>{
    res.render('index', {titulo: 'Home'})
})

app.get('/region', (req, res) =>{
    res.render('region', {titulo: 'Region'})
})

app.get('/formula', (req, res) =>{
    res.render('formula', {titulo: 'Formula One'})
})

app.get('/gt3', (req, res) =>{
    res.render('gt3', {titulo: 'GT3'})
})

app.get('/lmp1', (req, res) =>{
    res.render('lmp1', {titulo: 'LMP1'})
})

app.get('/contact', (req, res) =>{
    res.render('contact', {titulo: 'Contact Us'})
})

app.post('/contact', (req, res) =>{
    console.log(req.body);
    res.render('form-received');

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
})

// verbo http para recibir datos
app.post('/footer', (req, res) =>{
    console.log(req.body);
    res.render('subscribed', {titulo: 'Subscribed'})
// Desestructuramos
    console.log(req.body.emailNewsletter);
})

app.get('/construction', (req, res) =>{
    res.render('construction', {titulo: 'Under construction'})
})

app.get('*', (req, res) => { 
    res.render('404.hbs') 
});

app.listen(Port, () =>{
    console.log(`Servidor corriendo en el puerto ${Port}`);
})

app.on('error', (error) =>{
    console.log(`Tenemos un error ${error}`);
})

