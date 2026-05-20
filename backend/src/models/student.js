const mongoose = require("mongoose");
/* Criando Schema (Estrutura de quais informações estarão no banco de dados) para os alunos */
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    monthlyFee: {
        type: Number,
        required: true,
        min: 0 // Evita mensalidade negativa
    },
    studentShift: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true // Faz o mongoDB criar data de criação e atualização de um aluno
    }
);

// "Student" é o nome do model (interface onde é possível salvar,buscar,atualizar,deletar dados).
// "studentSchema" é o schema que será usado para a criação do model
module.exports = mongoose.model("Student", studentSchema); 