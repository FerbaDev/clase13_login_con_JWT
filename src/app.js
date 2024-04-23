import express from "express";
import "./database.js";
import exphbs from "express-handlebars";

const app = express();
const PUERTO = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//rutas
app.get("/", (req, res) => {
    res.send("Conectado al server")
})


//listen
app.listen(PUERTO, () => {
    console.log(`Conectado a http://localhost:${PUERTO}`);
})