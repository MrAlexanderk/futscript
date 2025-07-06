import express from 'express'
import dotenv from 'dotenv'
import { login } from './controllers/usuarios.js'
import { obtenerJugadores, registrarJugador } from './controllers/jugadores.js'
import { obtenerEquipos, agregarEquipo } from './controllers/equipos.js'
import verifyToken from './middlewares/auth.js'

dotenv.config()

const app = express()
app.use(express.json())

// Rutas
app.post("/login", login)
app.get("/equipos", obtenerEquipos)
app.post("/equipos", verifyToken, agregarEquipo)
app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", verifyToken, registrarJugador)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`SERVER ON at http://localhost:${PORT}`))

export default app
