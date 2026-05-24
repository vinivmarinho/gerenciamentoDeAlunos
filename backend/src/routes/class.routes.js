const express = require('express');
const router = express.Router();
const classControllers = require("../controllers/classController");

router.post("/", classControllers.createClass);

module.exports = router;
