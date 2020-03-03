const express = require('express');
const router = new express.Router();
const Joi             = require('joi');
const db    = require('../models/collections.js');
const bcrypt = require('bcryptjs');


router.post('/login', async (req, res)=>{
    const loginValidation = functions.validateLogin(req.body);
    if (loginValidation.error){
        res.send("Invalid Input")
    }
    const loginMail = req.body.login_email;
    const loginPass = req.body.login_pass;

    var user;
    await db.user.findOne({email: loginMail}, (err, returnedUser)=>{
        if(err){
            res.send('Login Failed')
        } else {
            if (returnedUser===null||returnedUser===undefined){
                res.send('Email is not Registered')
            } else{
                user = returnedUser;
            }
        }
    })
    try{
         if(await bcrypt.compare(loginPass, user.password)){
             req.session.email=user.email;
             req.session.logged=true;
            //  console.log(user.displayName)
            //  res.send('/dashboard/login/'+user._id);
            res.render('dashboard', {player: user})
         }
        //     bcrypt.compare(loginPass, user.password, (err, result)=>{
        //         req.session.id = user._id;
        //         // console.log('Break Point!')
        //     // console.log(user.displayName)
        //     res.redirect('/dashboard');
        // })
    } catch{
        res.send('An authentication error occured')
        // res.status(500).send('Wrong Credentials, Yay!!!')
    }
})