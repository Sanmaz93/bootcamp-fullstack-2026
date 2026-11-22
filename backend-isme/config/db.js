const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada!')
    } catch (error) {
        console.error('Error conectándose a la base de datos:', error.message)
    }
}

module.exports = dbConnection