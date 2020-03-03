// REQUIRE DEPENDENCIES
const express = require('express');
const router = new express.Router();
const Joi             = require('joi');
const db    = require('../models/collections.js');
const bcrypt = require('bcryptjs');
// const session = require('express-session');

const functions = require('../functions.js');



// ADD REGISTER AND POST ROUTES
router.post('/register', async (req, res)=>{
    const regValidation = functions.validateReg(req.body);
    if(regValidation.error){
        res.status(400).send(regValidation.error.details[0].message);
        return;
    }
    var firstName, lastName;
    if(req.body.full_name!=''){
        const names = req.body.full_name.split(' ');
        if(names.length>=2){
            firstName = names[0];
            lastName = names[1];
        } else firstName = names[0];
    }
    const salt = await bcrypt.genSalt();
    // console.log('break!!!')
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const userObject = {
        displayName: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        country: req.body.country,
        postal_code: req.body.postal_code,
        firstName: firstName,
        lastName: lastName || '',
        photo: req.body.photo
    }

    console.log(hashedPassword);

    db.user.create(userObject, (err, newUser)=>{
        if(err) {
            console.log('Could not create new game' + err);
            return;
        } else console.log(newUser);
        res.redirect('/');
    })
})


//router.post('/login', async function(req, res){
//    const loginValidation = functions.validateLogin(req.body);
//    if (loginValidation.error){
//        req.session.errormsg = 'Invalid Input!';
//        res.redirect('/');
//    }
//    const loginMail = req.body.login_email;
//    const loginPass = req.body.login_pass;
//
//    var user;
//    await db.user.findOne({email: loginMail}, (err, returnedUser)=>{
//        if(err){
//            console.log(err)
//        } else {
//            if (returnedUser===null||returnedUser===undefined){
//                req.session.errormsg = 'E-Mail is not attached to an account!';
//                res.redirect('/');
//            } else{
//                user = returnedUser;
//                console.log(user.displayName)
//            }
//        }
//    })
//    try{
//         if(await bcrypt.compare(loginPass, user.password)){
//             req.session.email=user.email;
//             req.session.logged=true
//
//             res.redirect('/dashboard/login/'+user._id);
//         }
//        //     bcrypt.compare(loginPass, user.password, (err, result)=>{
//        //         req.session.id = user._id;
//        //         // console.log('Break Point!')
//        //     // console.log(user.displayName)
//        //     res.redirect('/dashboard');
//        // })
//    } catch{
//        req.session.errormsg='Incorrect Password!';
//        res.redirect('/');
//        // res.status(500).send('Wrong Credentials, Yay!!!')
//    }
//})


 router.post('/login', async (req, res)=>{
     console.log(req.body.login_email)
     const loginValidation = functions.validateLogin(req.body);
     if (loginValidation.error){
         res.send("Invalid Input")
     }
     var loginMail, loginPass
//                     if(req.statusCode==200){
//                         var data = JSON.parse(req.body)
//                         console.log(data)
                         loginMail = req.body.login_email;
                         loginPass = req.body.login_pass;
                         console.log(loginMail, loginPass)
  
//                     }

     var user;
     await db.user.findOne({email: loginMail}, (err, returnedUser)=>{
         if(err){
             res.send('Login Failed')
         } else {
             if (returnedUser===null||returnedUser===undefined){
                 res.status(404).send('Email is not Registered')
             } else{
                 user = returnedUser;
             }
         }
     })
//     console.log(user)
     try{
          if(await bcrypt.compare(loginPass, user.password)){
              req.session.email=user.email;
              req.session.logged=true
              res.redirect('/dashboard/login/'+user._id)
          }
    //  return
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

module.exports = router;