const express = require('express');
const router = express.Router();
const classControllers = require("../controllers/classController");

router.post("/", classControllers.createClass);
router.get("/", classControllers.showClasses);
router.delete("/:id", classControllers.deleteClass);

module.exports = router;
