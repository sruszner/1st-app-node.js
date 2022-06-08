
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
/* 
    conexion.connect(function(error){
    if(error) throw error;
    console.log("Conexion a la DB exitosa");
}) */

/* const conectar = async({
    await conexion.connect((error) => {
        if(error) throw error;
        console.log('Base de datos conectada!');
    })
}) 
 */

// Configuracion de middlewares 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: false}));


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

app.get('/formulario', (req, res) =>{
    res.render('formulario', {titulo: 'Formulario'})
})

// verbo http para recibir datos

app.post('/formulario', (req, res) =>{
    console.log(req.body);
    res.send('Recibimos tus datos')
// Desestructuramos
    console.log(req.body.nombre);
    console.log(req.body.precio);
    console.log(req.body.descripcion);

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


