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

module.exports = { createStudent };
