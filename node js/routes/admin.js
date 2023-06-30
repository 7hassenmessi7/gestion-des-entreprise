const express =require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const Admin = require('../models/admin');



router.post('/register' , (req , res)=>{
    let data = req.body;
    let user = new Admin(data);
    
    //cryptage password
    let salt            = bcrypt.genSaltSync(10);
    let cryptedPassword = bcrypt.hashSync(user.password , salt);
     //put crypted pass in userPass
    user.password = cryptedPassword

    user.save()
    .then(
        (adminsaved)=>{
            res.send(adminsaved);


        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.post('/login', (req, res)=>{

    let data = req.body;
    
    Admin.findOne({email:data.email})

       .then(
        (user)=>{
            //compare between pass in db and input pass

            let validPass = bcrypt.compareSync(data.password, user.password)

            if(validPass ==false){
                res.send('email or pass invalide');
            }
            else{
                let tokenData ={
                    _id :user._id,
                    email:user.email,
                    name: user.name,
                    lastname:user.lastname
                }
                  //we build token
                 let token =jwt.sign(tokenData, '123456123');
                 res.send({'my token':token});
                }
          
        }
       )
       .catch(
        (err)=>{
            res.send(err)
        }
       )


});








module.exports = router;