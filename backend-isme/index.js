require('dotenv').config()   
const express = require('express')
const cors = require('cors')
const dbConnection = require('./config/db')

const app = express()
const PUERTO = process.env.PUERTO || 4000

// Conexión a la base de datos
dbConnection()
const authRouter = require('./routes/auth.routes')

// Middlewares
app.use(cors())
app.use(express.json())

app.get('/', (peticion, respuesta) => {
    respuesta.json({ msg: 'API de isme funcionando' })
})

app.listen(PUERTO, () => {
    console.log('Servidor escuchando en el puerto', PUERTO)
})
app.use('/api/users', authRouter)