import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  allowExitOnIdle: true
})

export const getPositionId = async (positionName) => {
  const query = `SELECT id FROM posiciones WHERE name = $1`
  const result = await pool.query(query, [positionName])

  if (result.rowCount === 0) {
    throw new Error('Posición no válida')
  }

  return result.rows[0].id
}


export const getTeams = async () => {
  const { rows } = await pool.query('SELECT id, name FROM equipos')
  return rows
}

export const getPlayers = async (teamID) => {
  const query = `
    SELECT j.name, j.position
    FROM jugadores j
    INNER JOIN equipos e ON j.id_equipo = e.id
    WHERE e.id = $1
  `
  const { rows } = await pool.query(query, [teamID])
  return rows
}


export const addTeam = async (equipo) => {
  const { name } = equipo
  await pool.query('INSERT INTO equipos (name) VALUES ($1)', [name])
}

export const addPlayer = async ({ jugador, teamID }) => {
  const { name, position } = jugador

  // Aquí traducimos "delantero" a su id correspondiente (ej. 1)
  const positionId = await getPositionId(position)

  const query = `
    INSERT INTO jugadores (name, position, id_equipo)
    VALUES ($1, $2, $3)
  `
  await pool.query(query, [name, positionId, teamID])
}
