const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {
    const atletasCiudad = config.atletas.map(atleta => {
        const ciudad = config.ciudades.find(c => c.id === atleta.ciudadId);
        return {
            ...atleta,
            ciudadNombre: ciudad ? ciudad.nombre : 'Desconocida'
        };
    });
    res.json(atletasCiudad);
});

router.post('/', (req, res) => {
    console.log('Datos recibidos:', req.body);
    const {dni, nombre, tiempo, posicion, ciudadId} = req.body;
    if (!dni || !Number.isInteger(dni) || dni <= 0) return res.status(400).json({error: 'DNI inválido'});
    if (config.atletas.some(a => a.dni === dni)) return res.status(400).json({error: 'Ya existe un atleta con ese DNI'});
    if (!ciudadId || isNaN(ciudadId) || !config.ciudades.some(c => c.id === Number(ciudadId))) return res.status(400).json({error: 'Ciudad inválida'});
    if (!nombre || !tiempo || !posicion || posicion <= 0) return res.status(400).json({error: 'Datos del atleta incompletos o inválidos'});


    const nuevoAtleta = {
    id: config.getSigAtletaId(),
    dni,
    nombre: nombre.trim(),
    tiempo: tiempo.trim(),
    posicion: parseInt(posicion),
    ciudadId: Number(ciudadId)
    };
    config.atletas.push(nuevoAtleta);
    res.status(201).json(nuevoAtleta);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {dni, nombre, tiempo, posicion, ciudadId} = req.body;

    const atletaIndex = config.atletas.findIndex(a => a.id === id);
    if (atletaIndex === -1) return res.status(404).json({error: 'Atleta no encontrado'});

    if (dni && config.atletas.some(a => a.dni === dni && a.id !== id)) return res.status(400).json({error: 'Ya existe un atleta con ese DNI'});
    if (ciudadId && !config.ciudades.some(c => c.id === ciudadId)) return res.status(400).json({error: 'Ciudad inválida'});
    
    const atleta = config.atletas[atletaIndex];
    if (dni) atleta.dni = dni;
    if (nombre) atleta.nombre = nombre.trim();
    if (tiempo) atleta.tiempo = tiempo.trim();
    if (posicion) atleta.posicion = parseInt(posicion);
    if (ciudadId) atleta.ciudadId = ciudadId;

    res.json(atleta);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = config.atletas.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({error: 'Atleta no encontrado'});
    config.atletas.splice(index, 1);
    res.status(204).send();
});

module.exports = router;


