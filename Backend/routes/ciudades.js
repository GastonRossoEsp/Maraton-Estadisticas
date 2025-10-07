const express = require('express');
const router = express.Router();
const {ciudades, getSigCiudadId} = require('../config');

router.get('/', (req, res) => {
    res.json(ciudades);
});

router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: 'Nombre de ciudad inválido' });
    }
    const nuevaCiudad = {id: getSigCiudadId(), nombre: nombre.trim()}; ciudades.push(nuevaCiudad);
    res.status(201).json(nuevaCiudad);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;
    const index = ciudades.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Ciudad no encontrada' });
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: 'Nombre de ciudad inválido' });
    }
    ciudades[index].nombre = nombre.trim();
    res.json(ciudades[index]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const atletaCiudad = require('../config').atletas.some(a => a.ciudadId === id);
    if (atletaCiudad) return res.status(400).json({ error: 'No se puede eliminar la ciudad porque está asociada a un atleta' });

    const index = ciudades.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Ciudad no encontrada' });
    ciudades.splice(index, 1);
    res.status(204).send();
});

module.exports = router;