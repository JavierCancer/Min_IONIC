
//Configuración del servidor y las rutas

//Librerías que necesitamos

var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var path        = require('path');
var http        = require('http');
var fs          = require('fs');
var bodyParser      = require("body-parser");
var cookieParser = require('cookie-parser');
var passport = require('passport');
var router = express.Router();
var expressSession = require('express-session');

var bcrypt = require ('bcrypt-nodejs');


// Conexión con la base de datos
mongoose.connect("mongodb://localhost/examenDB", function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conectado a la base de datos");
    }
});

// Configuración


app.set('port',process.env.PORT || 8080); //Ponemos a escuchar en el puerto 8000
app.use(express.bodyParser());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public'))); //Localización de los ficheros estáticos
app.use(express.logger('dev')); //Muestra log de los request
app.use(passport.initialize());
app.use(passport.session());

app.use(express.cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));

//filtro cors de los cojones

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Rutas API
routes = require('./routes/Subject')(app);



//Creamos e iniciamos el servidor
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});