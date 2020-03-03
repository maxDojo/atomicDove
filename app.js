//SETUP MAIN DEPENDENCIES
const express           = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        path            = require('path'),
        // Joi             = require('joi'),mon
        logger          = require('morgan'),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local");
        const session = require('express-session');
   

// CONNECT TO DATABASE
    mongoose.connect("mongodb://localhost/ad", {useNewUrlParser: true, useUnifiedTopology: true});


// ADD MY MODULES
    const db       = require('./models/collections.js');
    const indexRoutes = require('./routes/index.js');
    const dashboardRoutes = require('./routes/dashboardRoutes.js');
    const authRoutes = require('./routes/authRoutes.js');
    // const functions = require('./functions.js');


// CONFIGURE APP
app.set("view engine", "ejs")
app.use(express.static("public", {strict: 'disabled'}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
var viewPath = path.resolve(__dirname, 'views')
app.set('views', viewPath)
// app.set('trust proxy', 1)
app.use(session({
    secret: 'ilovefriedish',
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true}
}))
app.use(logger('dev'))


// SETUP
process.on('uncaughtException', (err) =>{
    console.error('There was an uncaught error', err)
    process.exit(1)
})

 




// LINK TO ROUTE HANDLERS
app.use(indexRoutes);
app.use(dashboardRoutes);
app.use(authRoutes);
// app.use(functions);

app.get('*', (req, res)=>{
    res.status(404).render('404')
})


app.listen(3000, function(){
           console.log("Server Started on port 3000");
           });