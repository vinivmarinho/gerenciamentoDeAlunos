// Importa o app (de outro arquivo) e o cors 
require("dotenv").config(); // Importa dotenv (globalmente) para variáveis de ambiente
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Rota teste
app.get("/", (req, res) => {
    res.send("Servidor está funcionando")
})

// Função async que inicia o servidor e conecta ao mongoDB
const startServer = async() => {
    try{
        await connectDB(); // Continua o bloco apenas se "connectDB" for realizado
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
        });
    } catch(error) {
        console.log(`Erro: ${error}`)
    }
}

startServer();



