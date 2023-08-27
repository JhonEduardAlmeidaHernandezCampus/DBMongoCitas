import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';

import { Estructura } from '../helpers/tokens/token.js';

import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

const validarEstructura = Router();

validarEstructura.use((req, res, next) => {
    if(!rateLimit) return;

    let { payload } = req.data;
    const { iat, exp, ...newPayload} = payload;
    payload = newPayload;

    let clon = JSON.stringify(classToPlain(plainToClass(Estructura("medicos").class, {}, { ignoreDecorators: true})));
    let verificar = clon === JSON.stringify(payload);

    req.data = undefined;

    (!verificar) ? res.send({status: 406, message: "Autorizacion fallida"}) : next();
})

export {
    validarEstructura, 
}