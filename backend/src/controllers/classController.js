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

module.exports = { createClass, showClasses }