const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    // Relaciona um pagamento a um aluno
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
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

module.exports = mongoose.model("Payment", paymentSchema);