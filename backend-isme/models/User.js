const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Campos específicos del negocio (isme - leggins deportivos)
    direccionEnvio: {
        type: String,
        required: true
    },
    tallaPreferida: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        default: 'M'
    }
})

module.exports = mongoose.model('User', userSchema)