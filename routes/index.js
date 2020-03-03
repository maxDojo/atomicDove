const express = require('express');
const router = new express.Router();
const db = require('../models/collections');
// const session = require('express-session');

router.get("/", function(req, res)
{
    var meta = {
        title: 'Atomic Dove | Home'
    }
    if(req.session.logged===true){
        res.redirect('/dashboard')
    }else{
        res.render('home', {page: meta});
    }
});


router.get("/register", function(req, res)
{
    var meta = {
        title: 'Atomic Dove | Register',
    }
    if(req.session.logged===true){
        res.redirect('dashboard')
    } else{
        res.render("register", {page: meta});
    }
});

// router.get('/login/:id', async (req, res)=>{
//     console.log(req.session.email)
//         // return
//         const page = 'military';
// })




 
// router.get("*", function(req, res){
//     res.redirect("/");
// });



module.exports = router;