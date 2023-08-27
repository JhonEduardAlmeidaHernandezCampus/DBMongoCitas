import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';

import { Estructura } from '../helpers/tokens/token.js';

import { Usuarios } from '../helpers/controllers/usuarios.js';

import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

const validarEstructura = Router();
const validarData = Router();

validarEstructura.use((req, res, next) => {
    let { payload } = req.data;
    let { iat, exp, ...newPayload} = payload;
    payload = newPayload;

    let clon = JSON.stringify(classToPlain(plainToClass(Estructura("usuarios").class, {}, { ignoreDecorators: true})));
    let verificar = clon === JSON.stringify(payload);

    req.data = undefined;

    (!verificar) ? res.send({status: 406, message: "Autorizacion fallida"}) : next();
})

validarData.use( async(req, res, next) => {
    try {

        let data = plainToClass(Usuarios, req.body)
        await validate(data)

        req.body = JSON.parse(JSON.stringify(data))
        req.data = undefined;

        next();

    } catch (error) {
        res.send(error)
    }
})

export {
    validarEstructura, 
    validarData
}