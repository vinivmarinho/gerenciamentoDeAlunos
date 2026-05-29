const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    // Relaciona um pagamento a um aluno
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    referenceMonth: {
        type: String,
        required: true
    },
    // Valor do pagamento
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Pendente", "Pago", "Atrasado"]
    }
}, {
    timestamps: true
    }
);
// Índice único. Impede que o mesmo aluno tenha dois pagamentos no mesmo mês
paymentSchema.index({ student: 1, referenceMonth: 1 }, { unique: true });

module.exports = mongoose.model("Payment", paymentSchema);