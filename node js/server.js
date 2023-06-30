// import express for buuild server
const express = require('express');
require('./config/connect');
const cors = require('cors');

const departementRoute = require('./routes/departement');
const employeeRoute    =require('./routes/employee');
const clientRoute      =require('./routes/client');
const adminRoute       = require('./routes/admin');

const app = express();

app.use( express.json() );
app.use(cors());

app.use('/departement', departementRoute);
app.use('/employee'  ,employeeRoute );
app.use('/client'  ,clientRoute );

app.use('/admin' ,adminRoute);


app.use('/getimage' , express.static('./uploads'));



// besh app dima ta5dem

app.listen(3000, () =>{
    console.log('server work');
    } 
    );