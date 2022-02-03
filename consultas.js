const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Fa242729",
    database: "cursos",
    port: 5432,
});

//CREATE
const crearCurso = async (nombre, nivelTecnico, fechaInicio, duracion) => {
    try {
        const consulta = {
            text: `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
            values: [nombre, nivelTecnico, fechaInicio, duracion],
        };
        const result = await pool.query(consulta)
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}
// READ
const obtenerCursos = async () => {
    try {
        const consulta = {
            text: `SELECT * FROM cursos`,
            values: [],
        }
        const  result = await pool.query(consulta);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

//UPDATE
const actualizarCurso = async (id, nombre, nivelTecnico, fechaInicio, duracion) => {
    try {
        const consulta = {
            text: `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
            values: [id, nombre, nivelTecnico, fechaInicio, duracion],
        };
        const  result = await pool.query(consulta);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

const eliminarCurso = async (id) => {
    try {
        const consulta = {
            text: `DELETE FROM cursos WHERE id = $1`,
            values: [id],
        }
        const  result = await pool.query(consulta);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    crearCurso,
    obtenerCursos,
    actualizarCurso,
    eliminarCurso
};