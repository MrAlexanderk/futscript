import request from 'supertest'
import app from '../index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.SECRET_KEY

describe('API FutScript', () => {
  let token

  beforeAll(() => {
    token = jwt.sign({ username: 'admin' }, secretKey, { expiresIn: '1h' })
  })

  test('GET /equipos retorna 200 y un array', async () => {
    const res = await request(app).get('/equipos')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('POST /login con credenciales correctas retorna token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  test('POST /login con credenciales incorrectas retorna 400', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' })

    expect(res.statusCode).toBe(400)
  })

  test('POST /equipos/:teamID/jugadores con token válido retorna 201', async () => {
    const jugador = { name: 'Test Player', posicion: 'defensa' }

    const res = await request(app)
      .post('/equipos/1/jugadores')
      .set('Authorization', `Bearer ${token}`)
      .send(jugador)

    expect(res.statusCode).toBe(201)
  })
})
