// Importa express (Facilita criação do servidor e rotas) e cors (Permite comunicação entre backend e frontend)
const express = require("express");
const cors = require("cors")
// Cria o app
const app = express();

// Habilita receber requisições em JSON
app.use(express.json());

// Habilita cors para todas as rotas
app.use(cors());

module.exports = app;
