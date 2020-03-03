const Joi= require('joi');
const db = require('./models/collections.js')



// VALIDATOR FUNCTIONS FOR LOGIN AND REGISTER
exports.validateReg = (data)=>{
    const schema = {
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        confirm_password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        country: Joi.string(),
        title: Joi.string(),
        postal_code: Joi.string().optional(),
        full_name: Joi.string().optional(),
        photo: Joi.any().optional(),
        turbo: Joi.string().optional(),
        secret: Joi.string().optional(),
        answer: Joi.string().optional(),
        register: Joi.any().optional()
    }
    return Joi.validate(data, schema);
}

exports.validateLogin = (data)=>{
    const schema= {
        login_email: Joi.string().email({minDomainAtoms: 2}).required(),
        login_pass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
    return Joi.validate(data, schema);
}


// exports.findByEmail = (userEmail)=>{
//     db.user.findOne({email: userEmail}, (err, returnedUser)=>{
//         if(err){
//             console.log(err)
//         } else {
//             if (returnedUser===null||returnedUser===undefined){
//                 console.log(`Could not find user with email ${userEmail}`);
//                 return false
//             } else{
//                 console.log(returnedUser.displayName)
//                 return {returnedUser}
//             }
//         }
//     })

// }
// exports.findByTurbo = ()=>{
//     db.user.find({turbo: 'Yes'}, (err, users)=>{
//         if(err){
//             console.log(err)
//         } else {
//             if (users===null||users===undefined){
//                 console.log('Could not find turbo Users');
//                 return false
//             } else{
//                 console.log(returnedUsers.length+'Turbo Users Returned!')
//                 return users
//             }
//         }
//     })
// }