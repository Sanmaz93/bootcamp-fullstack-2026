const User = require('../models/User')
const bcrypt = require('bcrypt')

const registrar = async (peticion, respuesta) => {
    try {
        const { nombre, email, password, direccionEnvio, tallaPreferida } = peticion.body

        // ¿Ya existe un cliente con ese email?
        let user = await User.findOne({ email: email })

        if (user) return respuesta.status(400).json({
            msg: `El usuario ${email} ya existe en la base de datos`
        })

        // Encriptamos la contraseña antes de guardarla
        const passwordEncriptado = await bcrypt.hash(password, 10)

        user = new User({
            nombre,
            email,
            password: passwordEncriptado,
            direccionEnvio,
            tallaPreferida
        })

        await user.save()

        return respuesta.status(201).json({
            msg: 'El usuario fue creado exitosamente'
        })
    } catch (error) {
        return respuesta.status(500).json({
            msg: `Error al registrar usuario: ${error.message}`
        })
    }
}

module.exports = {
    registrar
}