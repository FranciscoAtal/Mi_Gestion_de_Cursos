const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { crearCurso, obtenerCursos, actualizarCurso, eliminarCurso } = require("./consultas");

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

//Creación
app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await crearCurso(nombre, nivelTecnico, fechaInicio, duracion );
    res.send(respuesta);
});

//Lectura
app.get("/cursos", async (req, res) => {
    const respuesta = await obtenerCursos();
    res.send(respuesta);
});

//Update
app.put("/curso", async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion  } = req.body;
    const respuesta = await actualizarCurso(id, nombre, nivelTecnico, fechaInicio, duracion );
    res.send(respuesta);
});

//Delete
app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await eliminarCurso(id);
    res.send(respuesta);
});

app.listen(3000, () => console.log("Servidor Inicializado en el puerto 3000"));