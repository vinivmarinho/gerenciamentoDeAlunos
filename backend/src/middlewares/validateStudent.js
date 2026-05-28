function validateStudent(req, res, next) {
    const { name, email, monthlyFee, studentShift, status } = req.body;

    if (!name || !email || monthlyFee === undefined || !studentShift || !status) {
        return res.status(400).json({message: "Campos obrigatórios ausentes. "});
    }

    if (typeof monthlyFee !== "number" || monthlyFee < 0 ) {
        return res.status(400).json({message: "monthlyFee deve ser um número >= 0"})
    }

    next(); // Passa para o próximo passo (controller)
};

module.exports = validateStudent;