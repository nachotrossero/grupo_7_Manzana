
//Requires
const express = require('express');
const path = require('path');
const mainRouter = require('./routers/mainRouter');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE

const session = require('express-session'); //para login
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');
const cors = require("cors");
const adminMiddleware = require('./middlewares/adminMiddleware');


//Express
const app = express();

require("dotenv").config();

//Middlewares
let PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`http:localhost:${PORT}`));

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({secret:'Shhh esto es secreto', resave: false, saveUninitialized: false}));
app.use(cookies());



app.use(userLoggedMiddleware);


//console.log(res.locals.userLogged + "funca el login???")

//Hacemos publicos algunos archivos
app.use(express.static(path.resolve(__dirname,'../public')));

//Formularios y método Post
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Template engine EJS
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');


//Rutas
app.use('/', mainRouter);




