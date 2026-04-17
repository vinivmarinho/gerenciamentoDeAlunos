const Student = require("../models/student");

// Cria algum aluno
const createStudent = async(req, res) => {
    try{
        await Student.create({
            name: "Vinícius",
            age: 21,
            monthlyFee: 150,
            goal: "Wants to improve"
        })
        res.send("Criou aluno")
    } catch(error) {
        res.status(500).json({
            message: "Erro ao criar aluno",
            error: error.message
        })
    }
};

// Deleta o aluno
const deleteStudent = async(req, res) => {
    try{
        const {id } = req.params; // Parâmetros da requisição
        const student = await Student.findById(id);
        await Student.findByIdAndDelete(id);
        res.send(`Aluno ${student.name} foi deletado `);
    } catch(error) {
        res.status(500).json({
            message: "Erro ao deletar aluno",
            error: error.message
        })
    }
};

// Lê todos os alunos
const showStudents = async(req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);

    } catch(error) {
        console.error(`Erro: ${error}`)
    }
};

module.exports = { createStudent, deleteStudent, showStudents };
