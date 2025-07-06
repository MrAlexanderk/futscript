import { getTeams, addTeam } from '../db/consultas.js'

export const obtenerEquipos = async (req, res) => {
  try {
    const equipos = await getTeams()
    res.status(200).json(equipos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos' })
  }
}

export const agregarEquipo = async (req, res) => {
  try {
    const equipo = req.body

    if (!equipo.name || equipo.name.trim() === '') {
      return res.status(400).json({ message: 'El nombre del equipo es requerido' })
    }

    await addTeam(equipo)
    res.status(201).json({ message: 'Equipo agregado con éxito' })
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el equipo' })
  }
}
