const paymentModel = require("../models/payment");
const Student = require("../models/student");

function isValidReferenceMonth(referenceMonth) {
    if (!/^\d{4}-\d{2}$/.test(referenceMonth)) return false;
    const month = Number(referenceMonth.split("-")[1]);
    return month >=1 && month <=12;
};

// Retorna data válida de vencimento.  
function buildDueDate(referenceMonth, dueDay = 10 ) {
    const [year, month] = referenceMonth.split("-").map(Number); // Converte "YYYY-MM" em números separados: [year, month]

    // Em JS, newDate(year, month, 0) retorna o último dia do mês anterior
    // Ex: newDate(2026, 5, 0) => Último dia de maio
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    // Garante que o valor fique entre o dia 1 e o último dia válido do mês
    const day = Math.min(Math.max(Number(dueDay) || 10, 1), lastDayOfMonth);
    return new Date(year, month -1, day);
} 

/* Gera mensalidades para todos os alunos ativos */
const generateMonthlyFees = async (req, res) => {
    try {
        const { referenceMonth, dueDay = 10} = req.body;

        if (!referenceMonth || !isValidReferenceMonth(referenceMonth)) {
            return res.status(400).json({
                message: "referenceMonth deve estar no formato YYYY-MM (ex: 2026-05)"
            });
        }
        
        const day = Number(dueDay);
        if (Number.isNaN(day) || day < 1 || day > 31 ) {
            return res.status(400).json({
                message: "dueDay deve estar entre os números 1 e 31"
            });
        }

        // Busca alunos ativos através do model "Student"
        const activeStudents = await Student.find({
            // Uso regex para ignorar "ativo" maiúsculo ou minúsculo
            status: { $regex: /^ativo$/i }
        });

        if (activeStudents.length === 0) {
            return res.status(200).json({
                message: "Nenhum aluno ativo encontrado",
                createdCount: 0
            });
        }

        let createdCount = 0;
        const dueDate = buildDueDate(referenceMonth, day);

        for (const student of activeStudents) {
            const alreadyExists = await paymentModel.findOne({
                student: student._id,
                referenceMonth
            });

            if (alreadyExists) continue;

            await paymentModel.create({
                student: student._id,
                referenceMonth,
                amount: student.monthlyFee,
                dueDate,
                status: "Pendente"
            });

            createdCount++;
        }
        

        const message = createdCount > 0 ? `${createdCount} mensalidade(s) gerada(s)` : "Nenhuma mensalidade nova foi criada (todas já existem para este mês)"

        res.status(200).json({message, createdCount});
    } catch(error) {
        return res.status(500).json({
            message: "Não foi possível gerar as mensalidades",
            error: error.message
        });
    }
};

/* Criar pagamento */
const createPayment = async(req, res) => {
    try{
        const { student, referenceMonth, amount, dueDay = 10, status} = req.body;

        // Valida status
        const validStatuses = ["Pendente", "Pago", "Atrasado"];
        if (status !== undefined && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Status inválido. Use: ${validStatuses.join(", ")}`
            });
        }
        
        if (status && status !== "Pendente") {
            return res.status(400).json({
                message: "Na criação, a mensalidade sempre inicia com status Pendente"
            })
        }

        if (!isValidReferenceMonth(referenceMonth)) {
            return res.status(400).json({
                message: "referenceMonth deve estar no formato YYYY-MM"
            });
        }

        const day = Number(dueDay);
        if (Number.isNaN(day) || day < 1 || day > 31) {
            return res.status(400).json({
                message: "dueDay deve estar entre os números 1 e 31"
            });
        }

        const dueDate = buildDueDate(referenceMonth, day);

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

module.exports = { createPayment, generateMonthlyFees };