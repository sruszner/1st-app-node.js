
const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 8080;
const hbs = require('hbs');
const mysql = require('mysql2');
const path = require('path');
const nodemailer = require('nodemailer');
const session = require('express-session');
const { request } = require('http');

// Conectamos la app a una Base de Datos

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
})

// Conectamos la Bse de Datos

conexion.connect(function (error) {
    if (error) throw error;
    console.log("Conexion a la DB exitosa");
})

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

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

app.get('/pricing', (req, res) => {
    res.render('pricing')
})

app.get('/administrator', (req, res) => {
    let sql = "SELECT * FROM FORMULARIO";
    let query = conexion.query(sql, (err, results) => {
        if (err) throw err;
        res.render('administrator', { tabla1: 'Contact List', results })
    })
})

app.post('/administrator', (req, res) => {
    console.log(req.body.firstname);
    console.log(req.body.email);
    console.log(req.body.id);
    //res.send("Actualizamos los datos");
    let sql = "UPDATE FORMULARIO SET firstName='" + req.body.firstname + "', email='" + req.body.email + "', plan='" + req.body.plan + "' WHERE id=" + req.body.id;
    let query = conexion.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/administrator')
    })
})

app.post('/delete', (req, res) => {

    console.log(req.body.id);
    //res.send("Eliminamos los datos");
    let sql = "DELETE FROM FORMULARIO WHERE id=" + req.body.id;
    let query = conexion.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/administrator')
    })
});


app.get('/lmp1', (req, res) => {
    res.render('lmp1', { titulo: 'LMP1' })
})

app.get('/login', (req, res) => {
    res.render('login')
})

/* app.post('/login', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { usuario, password, remember } = req.body;
    console.log(usuario);
    console.log(password);
    console.log(remember);
    res.send({ respuesta: "tus datos son correctos" })
})
 */


// Autenticacion LOGIN


app.post('/auth', function (request, response) {
    // Capture the input fields
    let usuario = request.body.usuario;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (usuario && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        conexion.query('SELECT * FROM REGISTRO WHERE email = ? AND pass = ?', [usuario, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.usuario = usuario;
                // Redirect to home page
                console.log('Sesión iniciada correctamente');
                response.redirect('/');
            } else {
                console.log('Datos incorrectos');
                response.redirect('login');
            }
            response.end();
        });
    } else {
        response.redirect('login');
        response.end();
    }
});

app.get('/forgot', (req, res) => {
    res.render('forgot')
})

app.post('/forgot', (req, res) => {
    console.log(req.body);
    //res.send({respuesta: "tus datos son correctos"})
    const { emailForgot } = req.body;
    console.log(emailForgot);
    res.send({ respuesta: "Check your email and follow the steps to reset your password" })
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
    res.send({ respuesta: "Your password has been successfully reset" })
})


app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {

    let { email, firstName, pass } = req.body;
    console.log(email);
    console.log(firstName);
    console.log(pass);

    let register = {
        email: email,
        firstName: firstName,
        pass: pass,
        plan: "1"
    }

    let sql = "INSERT INTO REGISTRO SET ?";
    let query = conexion.query(sql, register, (err, results) => {
        if (err) throw err;

        let transporter = nodemailer.createTransport({
            //service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'spafrancorchampsapp@gmail.com',
                pass: 'yqcocvlwiksrgvsy'
            }
        });

        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });


        var mailOptions = {
            from: 'spafrancorchapsapp@gmail.com',
            to: email,
            subject: 'SPA Circuit - Register',
            html: ('<h3>Thank you so much for your registration, ' + firstName + '</h3>' + ' <p>These are your login details</p> Email: ' + email + '<br>Password: ' + pass)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.render('login')
    });
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
    console.log(req.body.plan);
    console.log(req.body.message);
    console.log(req.body.dataStorage);
    console.log(req.body.beContacted);
    console.log(req.body.metOn);
    const { firstName, lastName, username, email, address, address2, country, state, zip, plan, message, dataStorage, beContacted, metOn } = req.body;
    //conectar();

    // no le paso el text area a data porque no lo declare en la Database

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
        plan: plan,
        message: message,
        dataStorage: dataStorage,
        beContacted: beContacted,
        metOn: metOn
    }

    let sql = "INSERT INTO FORMULARIO SET ?";
    let query = conexion.query(sql, data, (err, results) => {
        if (err) throw err;

        let transporter = nodemailer.createTransport({
            //service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'spafrancorchampsapp@gmail.com',
                pass: 'yqcocvlwiksrgvsy'
            }
        });

        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });


        var mailOptions = {
            from: 'spafrancorchapsapp@gmail.com',
            to: 'ruszner.sebastian@gmail.com',
            subject: 'SPA Circuit - NEW CONTACT FORM',
            html: ('<h3>Please check the latest contact form</h3>' + ' <p>These are the contact details</p> Name: ' + firstName + '<br>Last name: ' + lastName + '<br>email: ' + email + '<br>Plan Code: ' + plan + '<br>Message: ' + message)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.render('form-received');
    })
})

// verbo http para recibir datos

app.post('/subscribed', (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    let data = {
        email: email,
        plan: "1"
    }
    console.log('subscribed');
    let sql = "INSERT INTO NEWSLETTER SET ?";
    let query = conexion.query(sql, data, (err, results) => {
        if (err) throw err;
    })
    let transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'spafrancorchampsapp@gmail.com',
            pass: 'yqcocvlwiksrgvsy'
        }
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });


    var mailOptions = {
        from: 'spafrancorchapsapp@gmail.com',
        to: email,
        subject: 'SPA Circuit - Subscribed',
        html: '<h3>Thank you so much for your subscription,</h3> <p>it means a lot to us. We really appreciate you taking a moment of your time today.</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.render('form-received')
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

