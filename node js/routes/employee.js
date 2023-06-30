// ajout , getall, getbyid , upadate ,delete

const express = require('express');

const Employee = require('../models/Employee');
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
    let emp = new Employee(data);
    //take name of picture and save it in DB
    emp.image = filename;
    emp.save()
      .then(
        (savedemplpoyee)=>{
            filename='';
            res.send(savedemplpoyee);
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
  Employee.find()
  .then(
    (employees)=>{
      res.send(employees);
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )
})

//getbyid

router.get('/getbyid/:id' , (req, res)=>{
  let myId = req.params.id
  Employee.find({_id:myId})
  .then(
    (employee)=>{
      res.send(employee);
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
  Employee.findByIdAndDelete({_id:myId})
  .then(
    (deletedemp)=>{
      console.log(deletedemp);
      res.send(deletedemp);
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )

})

//update

router.put('/update/:id', (req , res)=>{
  let myId =req.params.id;
  let newData = req.body;
  Employee.findByIdAndUpdate({_id:myId},{newData})
  .then(
    (updatedemp)=>{
      res.send(updatedemp);
    }

  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )
    
 
});








module.exports = router;