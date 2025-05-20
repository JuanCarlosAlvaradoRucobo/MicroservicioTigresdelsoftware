//Importe
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

const ccid = new Ccid({
    creadorId: arguments[0],
    cursoId: arguments[1]
});
ccid.save()
    .then((result) => {
        //res.send(result);
        console.log(result);
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    })