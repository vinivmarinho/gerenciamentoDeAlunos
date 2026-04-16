const Student = require("../models/student");

// Função que cria algum aluno
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

// Função que deleta o aluno
const deleteStudent = async(req, res) => {
    try{
        const {id } = req.params;
        await Student.findByIdAndDelete(id);
        res.send("Aluno deletado");
    } catch(error) {
        res.status(500).json({
            message: "Erro ao deletar aluno",
            error: error.message
        })
    }
}

module.exports = { createStudent, deleteStudent };
