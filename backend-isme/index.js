const express = require('express')
const cors = require('cors')

const app = express()
const PUERTO = 4000

// Middlewares
app.use(cors())
app.use(express.json())

// Ruta de prueba
app.get('/', (peticion, respuesta) => {
    respuesta.json({ msg: 'API de isme funcionando' })
})

app.listen(PUERTO, () => {
    console.log('Servidor escuchando en el puerto', PUERTO)
})