const express = require('express');
const cors = require('cors');
const ciudadesRoutes = require('./routes/ciudades');
const atletasRoutes = require('./routes/atletas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/ciudades', ciudadesRoutes);
app.use('/atletas', atletasRoutes);

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});