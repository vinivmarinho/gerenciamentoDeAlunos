const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://vinimarinho2004_db_user:uKC7ixvkuJnbWEz9@cluster0.jubaq7p.mongodb.net/?appName=Cluster0`);
        console.log("MongoDb conectado");
    } catch(error) {
        console.error("Erro ao conectar");
        console.log(error.message);
        process.exit();
    }
}
module.exports =  connectDB;


