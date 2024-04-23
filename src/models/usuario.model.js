import mongoose from "mongoose";

const schema = new mongoose.Schema({
    usuario: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const usuarioModel = mongoose.model("usuarios", schema);

export default usuarioModel;