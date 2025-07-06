import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.SECRET_KEY

export const login = (req, res) => {
  const { username, password } = req.body

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' })
    return res.status(200).json({ token })
  }

  res.status(400).json({ message: 'Credenciales incorrectas' })
}
