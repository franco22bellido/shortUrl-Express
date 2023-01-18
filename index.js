import express from 'express';
import {create} from 'express-handlebars';
import dotevn from 'dotenv';
dotevn.config();

//base de datos
import db from './database/db.js'

import homeRoutes from './routes/home.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.static('public'));
app.use('/', homeRoutes);
app.use('/auth', authRoutes);

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