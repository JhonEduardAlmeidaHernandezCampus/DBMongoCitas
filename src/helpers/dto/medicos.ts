import { Expose, Transform } from "class-transformer";

export class Medicos {
    
    @Expose({name: "ID_License"})
    med_num_matricula: number;

    @Expose({name: "Name"})
    med_nombre_completo: string;

    @Expose({name: "Speciality"})
    med_especialidad: string;

    @Expose({name: "Name_Speciality"})
    nom_especialidad: string;

    @Expose({name: "Office"})
    med_consultorio: string;

    @Expose({name: "Name_Office"})
    nom_consultorio: string;

    constructor(data:Partial<Medicos>){
        Object.assign(this, data)
        this.med_num_matricula = 0
        this.med_nombre_completo = ""
        this.med_especialidad = ""
        this.nom_especialidad = ""
        this.med_consultorio = ""
        this.nom_consultorio = ""
    } 
}