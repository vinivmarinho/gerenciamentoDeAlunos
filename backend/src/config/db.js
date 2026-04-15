const mongoose = require("mongoose");
require("dotenv").config(); // Importa dotenv para variáveis de ambiente
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb conectado");
    } catch(error) {
        console.error("Erro ao conectar");
        console.log(process.env.MONGO_URI)
        console.log(error.message);
        process.exit();
    }
}
module.exports =  connectDB;


