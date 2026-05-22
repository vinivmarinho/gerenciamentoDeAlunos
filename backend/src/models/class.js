const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    students: [{
        // Cada item do array será um ID(objectId) do mongoDB
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student" // Id vem daqui. mesmo nome de mongoose.model("Student")
    }]

}, {
    timestamps: true
    }
);

module.exports = mongoose.model("Class", classSchema);