const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/generate", paymentController.generateMonthlyFees);
router.post("/", paymentController.createPayment);

module.exports = router;