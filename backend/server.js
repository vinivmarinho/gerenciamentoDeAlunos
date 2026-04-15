// Importa o app (de outro arquivo) e o cors 
const app = require('./src/app');
const connectDB = require('./src/config/db');
require("dotenv").config(); // Importa dotenv (globalmente) para variáveis de ambiente

// Rota teste
app.get("/", (req, res) => {
    res.send("Servidor está funcionando")
})

// Inicia o servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
})

// Chama a função que conecta ao mongoDb
connectDB()
// Função async que inicia o servidor e conecta ao mongoDB
