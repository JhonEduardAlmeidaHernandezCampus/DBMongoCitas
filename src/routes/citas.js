import { Router } from 'express';
import { con } from '../config/connect.js'
import { validarEstructura } from '../middlewares/middlewareCitas.js';
import { limit } from '../helpers/limit/limit.js';

let db = await con();
let storageCitas = Router()

/*
2. Obtener todas las citas alfabéticamente
*/
storageCitas.get("/", limit(), validarEstructura, async (req, res) => {
    try {

        let tabla = db.collection("citas")
        let data = await tabla.aggregate([
            {
                $project:{
                    _id: 0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
})

/*
6. Obtener las consultorías para un paciente específico (por ejemplo, paciente **con usu_id 1**)
*/
storageCitas.get("/citas_usuario/:id", limit(), async (req, res) => {
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
        res.send({status: 400, message: "Error al consultar la collection"})
    }
});

/*
7. Encontrar todas las citas para un día específico (por ejemplo, **'2023-08-12'**)
*/
storageCitas.get("/dia_especifico/:date", limit(), async (req, res) => {
    try {

        let id = req.params.date

        let tabla = db.collection("citas")
        let data = await tabla.aggregate([
            {
                $match: {
                    cit_fecha: id
                }
            },
            { 
                $project: {
                    _id: 0,
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
});

/*
9. Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con **med_nroMatriculaProsional 1 en '2023-07-12'**)
*/
storageCitas.get("/medico/:id/fecha/:date", limit(), async (req, res) => {
    try {

        let id = req.params.id
        id = parseInt(id)
        let date = req.params.date

        let tabla = db.collection("medicos")
        let data = await tabla.aggregate([
            {
                $lookup: {
                    from: "citas",
                    localField: "med_num_matricula",
                    foreignField: "cit_datos_medico",
                    as: "fk_medicos_citas"
                }
            },
            {
                $match: {
                    "fk_medicos_citas.cit_fecha": date,
                    "fk_medicos_citas.cit_datos_medico": id
                }
            },
            { 
                $project: {
                    _id: 0,
                    "fk_medicos_citas._id": 0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
});

/*
11. Obtener todas las citas realizadas por los pacientes de un genero si su estado de la cita fue atendida
*/
storageCitas.get("/genero/:gender", limit(), async (req, res) => {
    try {

        let gender = req.params.gender

        let tabla = db.collection("usuarios")
        let data = await tabla.aggregate([
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
                    usu_genero: gender,
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
        res.send({status: 400, message: "Error al consultar la collection"})
    }
});

/*
12. Mostrar todas las citas que fueron rechazadas y en un mes específico, mostrar la fecha de la cita, el nombre del usuario y el médico.
*/
storageCitas.get("/rechazadas/:mes", limit(), async (req, res) => {
    try {

        let mes = parseInt(req.params.mes);

        let tabla = db.collection("usuarios")
        let data = await tabla.aggregate([
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
                    "fk_usuarios_citas.cit_estado_cita": "Rechazada",
                    $expr: {
                        $eq: [{ $month: { $dateFromString: { dateString: "$fk_usuarios_citas.cit_fecha" } } }, mes]
                    }
                }
            },
            {
                $lookup: {
                    from: "medicos",
                    localField: "fk_usuarios_citas.cit_datos_medico",
                    foreignField: "med_num_matricula",
                    as: "fk_citas_medicos"
                }
            },
            {
                $project: {
                    _id: 0,
                    usu_nombre_completo: 1,
                    "fk_usuarios_citas.cit_fecha": 1,
                    "fk_usuarios_citas.cit_estado_cita": 1,
                    "fk_citas_medicos.med_nombre_completo": 1,
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la Coleccion"})
    }
})


export default storageCitas