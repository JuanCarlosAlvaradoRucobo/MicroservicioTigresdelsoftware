import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import bodyParser from 'body-parser';
import apiRoutes from './routes/index.mjs'; // <-- usa el router central
dotenv.config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error al conectar MongoDB:', err));

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchado en http://localhost:${PORT}`);
});