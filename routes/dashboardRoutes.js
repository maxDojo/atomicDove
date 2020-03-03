const express = require('express');
const router = new express.Router();
const db = require('../models/collections.js')

var g_user;

router.get("/dashboard", (req, res)=>{
    if(req.session.logged===true){
        var meta={
            title: 'Dashboard | Atomic Dove',
            player: g_user
        }
        res.render('dashboard', {page: meta})
        // console.log(`Serving ${page} page`);
    } else{
        var loginFalse = new Error('You must be logged in to access dashboard!')
        res.redirect('/')
    }
});

router.get('/dashboard/login/:id', async function(req,res){
    if(req.session.email!==undefined && req.session.email!==null){
        try{
            await db.user.findById(req.params.id, (err, returnedUser)=>{
                if(err){
                    res.status(500).send('Error connecting to database')
                } else{
                    if (returnedUser!==null && returnedUser!==undefined){
                        g_user = returnedUser;
                    // res.render('military', {page: 'military', player: returnedUser})
                    req.session.logged=true;
                    res.redirect('/dashboard')
                } else {
                    req.session.logged=false;
                    res.redirect('/')
                }
            }
        })
        } catch{
            // req.session.errormsg='Unauthorized Access!, Please Log in to access your dashboard';
            res.redirect('/')
        }
    }
});




router.get('/dashboard/:tab/:tile', (req, res)=>{
    res.render(req.params.tab+'/'+req.params.tile);
})


module.exports = router;