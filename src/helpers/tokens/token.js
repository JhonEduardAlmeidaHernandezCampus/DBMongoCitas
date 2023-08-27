import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { my_jwt } from '../../config/variables.js';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';

import { Medicos } from '../controllers/medicos.js';
import { Citas } from '../controllers/citas.js';
import { Usuarios } from '../controllers/usuarios.js'

const generarToken = Router()
const validarToken = Router()

const Estructura = (clases) => {
    const Instances = {
        "medicos": Medicos,
        "citas": Citas,
        "usuarios": Usuarios
    }

    const respuesta = Instances[clases];
    if(!respuesta) throw {status: 404, message: "Error, token solicitado no valido"}
    return {atributos: plainToClass(respuesta, {}, {ignoreDecorators: true}), class: respuesta}
}

generarToken.post("/:clase", async(req, res) => {
    try {
        let insta = Estructura(req.params.clase).atributos
        const encoder = new TextEncoder()
        const jwtConstructor = new SignJWT(Object.assign({}, classToPlain(insta)))
        const jwt = await jwtConstructor
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30h")
        .sign(encoder.encode(my_jwt))

        res.send({status:202, message: jwt})

    } catch (error) {
        res.status(error.status).send(error)
    }
})

validarToken.get("/", async(req, res, next) => {

    const { authorization } = req.headers;
    if(!authorization) return res.send({status: 400, message: "Token no enviado"})

    try {
        
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization, 
            encoder.encode(my_jwt)
        );

        req.data = jwtData;
        next();

    } catch (error) {
        res.send({status: 400, message: "Token caducado"})
    }
})

export {
    generarToken,
    validarToken,
    Estructura
}