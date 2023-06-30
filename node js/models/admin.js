//register login update

const mongoose =require ('mongoose');



const Admin = mongoose.model('Admin' ,{
    name:String,
    lastname : String,
    email :String,
    password : String
});




module.exports = Admin