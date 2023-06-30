const mongoose = require('mongoose');


// build our model

const Departement = mongoose.model( 'Departement' , {

    name:String,
    description:String, 
    etage:String,
    salle:String

} )



module.exports=Departement;

// ajout , getall, getbyid , upadate ,delete