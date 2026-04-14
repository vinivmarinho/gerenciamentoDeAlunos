// Importa o app (de outro arquivo) e o cors 
const app = require('./src/app');

const PORT = 3000;

// Rota teste
app.get("/", (req, res) => {
    res.send("Servidor está funcionando")
})

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

