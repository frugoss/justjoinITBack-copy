require('dotenv').config()
const cors  = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 7000;
const path = require('path');

const corsOptions = {
    origin: 'http://192.168.10.25:3000',
    credentials: true
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

const authRoute = require('./routes/auth')
const offersRoute = require('./routes/offers');
const addRoute = require('./routes/add');
const cvRoute = require ('./routes/cv');

app.use('/upload', express.static(path.join(__dirname, 'uploads')));
app.use('/devs', authRoute);
app.use('/add', addRoute)
app.use('/', offersRoute);
app.use('/cv', cvRoute)



app.listen(port);
