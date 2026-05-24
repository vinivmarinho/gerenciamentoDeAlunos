const Student = require("../models/student");
// Rota teste
const health = async(req, res) => {
    res.status(200).json({message: "Rota health encontrada"})
};

// Cria algum aluno
const createStudent = async(req, res) => {
    try{
        const { name, email, monthlyFee, studentShift, status } = req.body;

        const student = await Student.create({
            name,
            email,
            monthlyFee,
            studentShift,
            status
        })

        res.status(201).json({
            message: `Aluno(a) ${student.name} criado`
        })
    } catch(error) {
        res.status(500).json({
            message: "Erro ao criar aluno(a)",
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

// Atualiza algum aluno
const updateStudent = async(req, res) => {
    try{
        const { id } = req.params;
        // Encontra aluno pelo ID e atualiza com a requisição do body
        const student = await Student.findByIdAndUpdate(
            id,
            req.body,
            { returnDocument: "after" } // Faz o mongoDB retornar o documento atualizado
        );

        res.status(200).json({student});
    } catch(error) {
        res.status(500).json({
            message: "Erro ao atualizar aluno",
            error: error.message
        });
    }
}

module.exports = { health, createStudent, deleteStudent, showStudents, updateStudent };
