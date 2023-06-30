const mongoose = require('mongoose');



const Employee = mongoose.model( 'Employee', {
    name : String,
    lastname : String,
    image : String,
    tel:String,
    email:String,
    adress: String,
    idDep :String

});


module.exports = Employee;
