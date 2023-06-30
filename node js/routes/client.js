// ajout , getall, getbyid , upadate ,delete

const express = require('express');

const Client = require('../models/Client');
const router = express.Router();

const multer = require ('multer');
filename='';
//config storage ta3 fichier
const myStorage = multer.diskStorage({
  //object
  destination: './uploads',
  filename :(req , file , redirect)=>{

    //build name for image
    let fl = Date.now()+"."+ file.mimetype.split('/')[1];
    filename = fl;

    redirect(null , fl);


  } 

})

//mildelware

const upload = multer({storage:myStorage});



//ajout

router.post('/ajout' , upload.any('image') ,(req , res)=>{
    let data = req.body;
    let cl = new Client(data);
    //take name of picture and save it in DB
    cl.image = filename;
    cl.save()
      .then(
        (savedclient)=>{
            filename='';
            res.send(savedclient);
        }

      )
      .catch(
        (err)=>{
            res.send(err);
        }
      )

    
});

//getall
router.get('/getall' , (req, res)=>{
  Client.find()
  .then(
    (clients)=>{
      res.send(clients);
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )
});

//getbyid

router.get('/getbyid/:id' , (req, res)=>{
  let myId = req.params.id
  Client.findById({_id:myId})
  .then(
    (client)=>{
      res.send(client);
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )
});

//delete

router.delete('/delete/:id' , (req, res)=>
{
  let myId = req.params.id;
  Client.findByIdAndDelete({_id:myId})
  .then(
    (deletedcl)=>{
      console.log(deletedcl);
      res.send(deletedcl);
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )

})

//update

router.put('/update/:id', upload.any('image') ,(req , res)=>{
  let myId =req.params.id;
  let newData = req.body;

  if(filename.length>0){
    newData.image = filename;
  }
  Client.findByIdAndUpdate({_id:myId},newData)
  .then(
    (updatedcl)=>{
      filename='';
      res.send(updatedcl);
      
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )
    
 
});








module.exports = router;