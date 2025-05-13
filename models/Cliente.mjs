import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
