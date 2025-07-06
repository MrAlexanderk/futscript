import { getPlayers, addPlayer } from '../db/consultas.js'

export const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params
    const jugadores = await getPlayers(teamID)
    res.status(200).json(jugadores)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los jugadores' })
  }
}

export const registrarJugador = async (req, res) => {
  try {
    const { teamID } = req.params
    const jugador = req.body

    if (!jugador.name || !jugador.position) {
      return res.status(400).json({ message: 'Faltan datos del jugador' })
    }

    await addPlayer({ jugador, teamID })
    res.status(201).json({ message: "Jugador agregado con éxito" })
  } catch (error) {
    console.error('Error en registrarJugador:', error.message)
    res.status(500).json({ error: 'Error al agregar el jugador' })
  }
}
