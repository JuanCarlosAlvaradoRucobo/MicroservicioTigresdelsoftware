//Importe
//var fileId = mongoose.Types.ObjectId();
const ObjectId = require('mongodb').ObjectId;
const express = require('express')
const Ccid = require('./creadorID_CursoID')
const mongoose = require('mongoose')
const arguments = process.argv.slice(2);
/*arguments.forEach((value, index) => {
  console.log(index, value);
});*/
//URL
const dataBase = "mongodb+srv://leobardofelix:abc123ABC@cluster0.qd0ytx9.mongodb.net/Microservicio?retryWrites=true&w=majority&appName=Cluster0"
//Conexión
mongoose.connect(dataBase)
.then((result) => console.log('conected to db'))
.catch((err) => console.log(err))
let salida;
Ccid.findOne({_id:new ObjectId(arguments[0])})
    .then ((value) => {
        salida = value;
        console.log(value);
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    })
module.exports = {
    salida
}