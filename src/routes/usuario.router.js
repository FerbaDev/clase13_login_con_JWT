import express from "express"; 
import UsuarioModel from "../models/usuario.model.js";
const router = express.Router(); 
import jwt from "jsonwebtoken";
import passport
 from "passport";


router.post("/register", async (req, res) => {
    const {usuario, password} = req.body;
    try {
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe")
        }

         //2) Creamos un nuevo usuario:
        const nuevoUsuario = new UsuarioModel({
            usuario,
            password       
        });

        //3) Lo guardamos en la base de datos: 
        await nuevoUsuario.save();

        //4) Generamos el Token de JWT: 
        const token = jwt.sign({usuario}, "coderhouse", {expiresIn:"1h"});

        //5) Mandamos como cookie el Token: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 hora
            httpOnly: true //La cookie solo se puede acceder mediante HTTP.
        })

        //6) Lo mandamos al home:
        res.redirect("/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Login

router.post("/login", async (req, res) => {
    const {usuario, password} = req.body;

    try {
        const usuarioEncontrado = await UsuarioModel.findOne({usuario});
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no valido.")
        }
        //verificamos el password
        if (password !== usuarioEncontrado.password) {
            return res.status(401).send("Contraseña incorrecta")
        }
        //Generamos el token
        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.role}, "coderhouse", {expiresIn: "1hr"});
        // mandamos el cookie token
        res.cookie("coderCookieToken", token, {maxAge: 360000, httpOnly: true});
        //mandarlo al home
        res.redirect("/home")
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})









//ruta para home
router.get("/home", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario})
})
export default router;