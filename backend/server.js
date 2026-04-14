// Importando o express (facilita criação de servidor e rotas) e o cors (Permite comunicação do backend com o frontend)
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Habilita cors para todas as rotas
app.use(cors());

// Habilita receber requisições em JSON
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
    res.send("Servidor está funcionando")
})

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

