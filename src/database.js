import mongoose from "mongoose";
import 'dotenv/config'


mongoose.connect(`mongodb+srv://Ferbadev:${process.env.PASSWORD}@cluster0.qaz6nck.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {console.log("Conectado a Mongo DB");})
    .catch((error) => {console.log("Sin conexión a Mongo DB"), error})