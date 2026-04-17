const express = require("express"); // Importa express (Facilita criação do servidor e rotas) e cors (Permite comunicação entre backend e frontend)
const cors = require("cors")
const app = express(); // Cria o app
app.use(express.json()); // Habilita receber requisições em JSON
app.use(cors()); // Habilita cors para todas as rotas
const studentsRoutes = require("./routes/student.routes");

// Define o caminho base "/students" para todas as rotas de studentsRoutes
app.use("/students", studentsRoutes);

module.exports = app;
