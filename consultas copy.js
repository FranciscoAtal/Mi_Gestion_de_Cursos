const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Fa242729",
    database: "cursos",
    port: 5432,
});

async function crearCurso(nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`
        );
        return result.rows;
    } catch (e) {
        return e;
    }
}
// READ
async function obtenerCursos () {
    try {
        const result = await pool.query(
            `SELECT * FROM cursos`
        );
        return result.rows;
    } catch (e) {
        return e;
    }
}

//UPDATE
async function actualizarCurso(id, nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const res = await pool.query(
            `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1'
    RETURNING *`
        );
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}

async function eliminarCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id = $1`);
        return result.rows;
    } catch (e) {
        return e;
    }
}

module.exports = {
    crearCurso,
    obtenerCursos,
    actualizarCurso,
    eliminarCurso
};