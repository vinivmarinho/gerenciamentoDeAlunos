const paymentModel = require("../models/payment");

/* Criar pagamento */
const createPayment = async(req, res) => {
    try{
        const { student, referenceMonth, amount, dueDate, status} = req.body;
        const validSatuses = ["Pendente", "Pago", "Atrasado"];
        if (status !== undefined && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Status inválido. Use: ${validSatuses.join(", ")}`
            });
        }
        
        if (status && status !== "Pendente") {
            return res.status(400).json({
                message: "Na criação, a mensalidade sempre inicia com status Pendente"
            })
        }


        // Valida referenceMonth usando regex
        const isValidMonth = /^\d{4}-\d{2}$/.test(referenceMonth);
        
        if (!isValidMonth) {
            return res.status(400).json({
                message: "referenceMonth deve estar no formato YYYY-MM"
            });
        }

        const payment = await paymentModel.create({
            student,
            referenceMonth,
            amount,
            dueDate,
            status: "Pendente"
        })

        res.status(201).json({
            message: "Pagamento criado com sucesso",
            payment: payment
        })

    } catch(error) {
        return res.status(500).json({
            message: "Não foi possível criar o pagamento",
            error: error.message
        })
    }
};

module.exports = { createPayment };