import express from 'express';
import Administrador from '../models/Administrador.mjs'; 


const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const yaExiste = await Administrador.findOne({ correo });
    if (yaExiste) {
      return res.status(409).json({ error: 'Correo ya registrado' });
    }

    const nuevoAdmin = new Administrador({ nombre, correo, password });
    await nuevoAdmin.save();

    res.status(201).json({ mensaje: 'Administrador registrado', admin: nuevoAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar administrador' });
  }
});

export default router;
