import { Router } from 'express';
import { con } from '../config/connect.js'
import { validarEstructura } from '../middlewares/middlewareMedicos.js';
import { limit } from '../helpers/limit/limit.js';

let db = await con();
let storageMedico = Router()

storageMedico.get("/", limit(), validarEstructura, async (req, res) => {
    try {

        let tabla = db.collection("medicos")
        let data = await tabla.find().toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
})

/*
3. Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**): 
*/
storageMedico.get("/:especialidad", limit(), async (req, res) => {
    try {

        let especialidad = req.params.especialidad

        let tabla = db.collection("medicos")
        let data = await tabla.aggregate([
            {
                $match: {
                    "med_especialidad.nom_especialidad": especialidad
                }
            },
            {
                $project: {
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
5. Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con **med_nroMatriculaProsional 1**)
*/
storageMedico.get("/usuarios/:numero_matricula", limit(), async (req, res) => {
    try {

        let numero_matricula = req.params.numero_matricula
        numero_matricula = parseInt(numero_matricula)

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
                $lookup: {
                    from: "medicos",
                    localField: "fk_usuarios_citas.cit_datos_medico",
                    foreignField: "med_num_matricula",
                    as: "fk_citas_medicos"
                }
            },
            {
                $match: {
                    "fk_citas_medicos.med_num_matricula": numero_matricula
                }
            },
            {
                $project: {
                    _id: 0,
                    usu_id: 1,
                    usu_nombre_completo: 1,
                    usu_telefono: 1,
                    usu_direccion: 1,
                    "fk_usuarios_citas.ID_cita": 1,
                    "fk_usuarios_citas.cit_fecha": 1,
                    "fk_usuarios_citas.cit_estado_cita": 1,
                    "fk_citas_medicos.med_num_matricula": 1,
                    "fk_citas_medicos.med_nombre_completo": 1,
                    "fk_citas_medicos.med_especialidad.nom_especialidad": 1,
                }
            }
        ]).toArray();

        console.log();
        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
})

/*
8. Obtener los médicos y sus consultorios
*/
storageMedico.get("/medico/consultorios", limit(), async (req, res) => {
    try {

        let especialidad = req.params.especialidad

        let tabla = db.collection("medicos")
        let data = await tabla.aggregate([
            {
                $project: {
                    _id: 0,
                    med_nombre_completo: 1,
                    "med_consultorio.nom_consultorio": 1
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
})

/*
10. Obtener los consultorio donde se aplicó las citas de un paciente
*/
storageMedico.get("/consultorios/citas/:paciente", limit(), async (req, res) => {
    try {

        let paciente = req.params.paciente
        paciente = parseInt(paciente)

        let tabla = db.collection("usuarios")
        let data = await tabla.aggregate([
            {
                $match: {
                    "usu_id": paciente
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
                    usu_id: 1,
                    usu_nombre_completo: 1,
                    "fk_citas_medicos.med_nombre_completo": 1,
                    "fk_citas_medicos.med_consultorio.nom_consultorio": 1,
                }
            }
        ]).toArray();

        console.log();
        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al consultar la collection"})
    }
})

export default storageMedico