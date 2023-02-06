import express from 'express';
import {create} from 'express-handlebars';
import dotevn from 'dotenv';
dotevn.config();

//base de datos
import db from './database/db.js'

//sessions
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import passportInit from './libs/passportInit.js';
import csurf from 'csurf';

import homeRoutes from './routes/home.js';
import authRoutes from './routes/auth.js';


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
//sessions
app.use(session({
    secret: "palabrasecreta2023",
    resave: false,
    saveUninitialized: false,
    name: "nombresecreto2023"
}));
//connect-flash inicialización.
app.use(flash());
//passport inicialización.
app.use(passport.initialize());
app.use(passport.session());
//csurf
app.use(csurf());
//variables globales
app.use((req, res, next)=>{
    res.locals.csrfToken = req.csrfToken();
    res.locals.msg = req.flash('msg');
    res.locals.confirmacount = req.flash('confirmar');
    next();
});

app.use('/', homeRoutes);
app.use('/auth', authRoutes);


//handdlebars
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
})
app.engine('.hbs', hbs.engine);
app.set('view engine', ".hbs");
app.set('views', "./views");
 

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("servidor en el puerto"+ port);
});