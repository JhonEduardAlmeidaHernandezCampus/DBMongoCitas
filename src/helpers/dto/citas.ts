import { Expose, Transform } from "class-transformer";

export class Citas {
    
    @Expose({name: "ID"})
    ID_cita: number;

    @Expose({name: "Date"})
    cit_fecha: string;

    @Expose({name: "Status"})
    cit_estado_cita: number;

    @Expose({name: "Data_Doctor"})
    cit_datos_medico: number;

    @Expose({name: "Data_User"})
    cit_datos_usuario: number;

    constructor(data:Partial<Citas>){
        Object.assign(this, data)
        this.ID_cita = 0
        this.cit_fecha = ""
        this.cit_estado_cita = 0
        this.cit_datos_medico = 0
        this.cit_datos_usuario = 0
    }
}