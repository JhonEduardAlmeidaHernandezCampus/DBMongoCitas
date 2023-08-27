import express from "express";
import { my_config } from "./config/variables.js";
import { generarToken, validarToken } from "./helpers/tokens/token.js";

import storageMedico from "./routes/medicos.js";
import storageCitas from "./routes/citas.js";
import storageUsuarios from "./routes/usuarios.js";

let app = express()
app.use(express.json())

app.use("/generarToken", generarToken)

app.use("/medicos", validarToken, storageMedico)
app.use("/citas", validarToken, storageCitas)
app.use("/usuarios", validarToken, storageUsuarios)

app.listen(my_config, () => console.log(`http://${my_config.hostname}:${my_config.port}`))