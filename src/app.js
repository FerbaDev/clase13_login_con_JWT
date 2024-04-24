import express from "express";
import "./database.js";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import usuarioRouter from "./routes/usuario.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";



const app = express();
const PUERTO = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();
//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//rutas
app.use("/", viewsRouter)
app.use("/", usuarioRouter)

//listen
app.listen(PUERTO, () => {
    console.log(`Conectado a http://localhost:${PUERTO}`);
})