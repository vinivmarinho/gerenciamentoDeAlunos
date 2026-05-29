const paymentModel = require("../models/payment");

/* Criar pagamento */
const createPayment = async(req, res) => {
    try{
        const { student, referenceMonth, amount, dueDate, status} = req.body;

        // Valida referenceMonth usando regex
        const isValidMonth = /^\d{4}-\d{2}$/.test(referenceMonth);
        
        if (!isValidMonth) {
            return res.status(400).json({
                message: "referenceMonth deve estar no formato YYYY-MM"
            });
        }

        const payment = await Payment.create({
            student,
            referenceMonth,
            amount,
            dueDate,
            status
        })

        res.status(201).json({
            message: "Pagamento criado com sucesso",
            payment: payment
        })

    } catch(error) {
        return res.status(500).json({
            message: "Não foi possível criar o pagamento"
        })
    }
}