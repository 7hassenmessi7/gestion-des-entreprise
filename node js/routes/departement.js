// ajout , getall, getbyid , upadate ,delete
const express = require('express');
const Departement = require("../models/departement");


const router =express.Router();

//ajout
router.post( '/ajout' , (req , res)=>{
    let data = req.body;

    //build an instance from model Departement
    // besh yefhem win besh ysajel data ta3 model ta3ou 
    let dep = new Departement(data);

    dep.save()
    .then(
        (savedDep)=>{
            console.log(savedDep);
            res.send(savedDep);
            
        }
    )
    .catch(
        (err)=>{
            console.log(err);
            res.send(err);

        }
    )

});

//getall

router.get('/getall' , (req, res)=>{
    Departement.find()
    .then(
        (departements)=>{
         res.send(departements);
        }
    )
    .catch(
        (err)=>{
         res.send(err); 
        }
    )
});

//get by id
router.get('/get_by_id/:id' , (req , res)=>{

    //read esm 'id' elli mawjoud fi lien
    let d =req.params.id;
    Departement.findById({_id:d})
       .then(
        (departements)=>{
            res.send(departements);
        }
       )
       .catch(
        (err)=>{
            res.send(err);
        }
       )


});

//delete 

router.delete('/delete/:id' , (req , res)=>{
    let myId = req.params.id;
    Departement.findByIdAndDelete({_id:myId})
       .then(
        (depDeleted)=>{
            res.send(depDeleted);
        }
       )
       .catch(
        (err)=>{
            res.send(err);
        }
       )

});


//update
router.put('/update/:id' , (req , res)=>{

    let myId = req.params.id;
    let newData = req.body;
    Departement.findByIdAndUpdate({ _id:myId }, newData)
       .then(
        (newdepart)=>{
            res.send(newdepart);

        }
       )
       .catch(
        (err)=>{
            res.send(err);
        }
       )


});





module.exports = router;