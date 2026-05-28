// Importa express, "router" pra controlar as rotas, e os controllers (lógica) das rotas
const express = require("express");
const router = express.Router();
const studentsControllers = require("../controllers/studentController");
const validateStudent = require("../middlewares/validateStudent");

// Rota de verificação
router.get("/health", studentsControllers.health);
router.post("/", validateStudent, studentsControllers.createStudent);
router.delete("/:id", studentsControllers.deleteStudent);
router.get("/", studentsControllers.showStudents);
router.put("/:id", studentsControllers.updateStudent);

module.exports = router;

