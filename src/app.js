import express from "express";
import "./database.js";

const app = express();
const PUERTO = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 


//rutas
app.get("/", (req, res) => {
    res.send("Conectado al server")
})


//listen
app.listen(PUERTO, () => {
    console.log(`Conectado a http://localhost:${PUERTO}`);
})