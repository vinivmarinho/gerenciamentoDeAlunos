const ClassModel = require("../models/class");

/* Cria nova turma */
const createClass = async(req, res) => {
    try{
        const { name, teacher, students} = req.body;

        const classModel = await ClassModel.create({
            name, 
            teacher,
            students
        })

        res.status(201).json({
            message: `Turma ${classModel.name} criada`
        })
    } catch(error) {
        res.status(500).json({
            message: "Erro ao criar turma",
            error: error.message
        })
    }
};

/* Mostra as turmas */
const showClasses = async(req, res) => {
    try{
        const classes = await ClassModel.find();
        res.status(200).json(classes)
    } catch(error) {
        console.error(`Erro: ${error}`)
    }
};

/* Deleta turma */
const deleteClass = async(req, res) => {
    try{
        const  { id }  = req.params; // Parâmetros da requisição
        const classGroup = await ClassModel.findById(id);
        await ClassModel.findByIdAndDelete(id);
        res.send(`Turma ${classGroup.name} deletada`)
    } catch(error) {
        res.status(500).json({
            message: "Erro ao deletar turma",
            error: error.message
        })
    }
};

/* Atualiza turma */
const updateClass = async(req, res) => {
    try{
        const { id } = req.params;

        const classGroup = await ClassModel.findByIdAndUpdate(
            id,
            req.body,
            { returnDocument: "after" }
        );

        res.status(200).json({classGroup});
    } catch(error) {
        res.status(500).json({
            message: "Erro ao atualizar turma",
            error: error.message
        });
    }
};

module.exports = { createClass, showClasses, deleteClass, updateClass }