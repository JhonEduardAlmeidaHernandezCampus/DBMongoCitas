import { Router } from 'express';
import { con } from '../config/connect.js'
import { validarEstructura } from '../middlewares/middlewareUsuarios.js';
import { limit } from '../helpers/limit/limit.js';

let db = await con();
let storageUsuarios = Router()

/*
1. Obtener todos los usuarios alfabéticamente
*/
storageUsuarios.get("/", limit(), validarEstructura, async (req, res) => {
    try {

        let tabla = db.collection("usuarios")
        let data = await tabla.aggregate([
            {
                $sort: {
                    usu_nombre_completo: +1
                }
            },
            { 
                $project: {
                    _id: 0,
                    ID: "$usu_id",
                    Tipo_Doc: "$usu_tipo_doc",
                    Nombre_Completo: "$usu_nombre_completo",
                    Genero: "$usu_genero",
                    Telefono: "$usu_telefono",
                    Direccion: "$usu_direccion",
                    Email: "$usu_email"
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
});

/*
4. Encontrar la próxima cita para un usuario específico (por ejemplo, el paciente con **usu_id 1**):
*/
storageUsuarios.get("/:id", limit(), async (req, res) => { //Averiguar porque se muere al entrar al middleware :)
    try {  

        let id = req.params.id
        id = parseInt(id)

        let tabla = db.collection("usuarios")
        let data = await tabla.aggregate([
            {
                $match: {
                    usu_id: id
                }
            },
            {
                $lookup: {
                    from: "citas",
                    localField: "usu_id",
                    foreignField: "cit_datos_usuario",
                    as: "fk_usuarios_citas"
                }
            },
            {
                $unwind: "$fk_usuarios_citas"
            },
            {
                $match: {
                    "fk_usuarios_citas.cit_estado_cita": "Activa"
                }
            },
            { 
                $project: {
                    _id: 0,
                    usu_acudiente: 0,
                    "fk_usuarios_citas._id": 0,
                    "fk_usuarios_citas.cit_datos_usuario": 0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la coleccion"})
    }
})

export default storageUsuarios