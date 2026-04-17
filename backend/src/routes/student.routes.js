// Importa express, "router" pra controlar as rotas, e os controllers (lógica) das rotas
const express = require("express");
const router = express.Router();
const studentsControllers = require("../controllers/studentController");

// Rota de verificação
router.get("/health", (req, res) => {
    res.status(200).json({message: "Rota health encontrada"})
});

router.post("/create", studentsControllers.createStudent);
router.delete("/delete/:id", studentsControllers.deleteStudent);
router.get("/read", studentsControllers.showStudents);

