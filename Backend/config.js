let ciudades = [
    { id: 1, nombre: "Buenos Aires" },
    { id: 2, nombre: "Córdoba" }
];

let atletas = [
    { id: 1, dni: 12345678, nombre: "Gaston Rosso", tiempo: "2h 07m 20s", posicion: 1, ciudadId: 1 },
    { id: 2, dni: 45678465, nombre: "Juan Lopez", tiempo: "2h 12m 45s", posicion: 2, ciudadId: 1 },
    { id: 3, dni: 23145698, nombre: "Pablo Perez", tiempo: "2h 15m 02s", posicion: 3, ciudadId: 2 }
];

let sigCiudadId = 3;
let sigAtletaId = 4;

module.exports = {
    ciudades,
    atletas,
    getSigCiudadId: () => sigCiudadId++,
    getSigAtletaId: () => sigAtletaId++ 
}