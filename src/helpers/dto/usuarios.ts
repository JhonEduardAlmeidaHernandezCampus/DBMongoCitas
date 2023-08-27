import { Expose, Transform } from "class-transformer";

export class Usuarios {
    
    @Expose({name: "ID"})
    usu_id: number;

    @Expose({name: "Tipo_Doc"})
    usu_tipo_doc: string;

    @Expose({name: "Name"})
    usu_nombre_completo: string;

    @Expose({name: "Gender"})
    usu_genero: string;

    @Expose({name: "Phone"})
    usu_telefono: string;

    @Expose({name: "Address"})
    usu_direccion: string;

    @Expose({name: "Email"})
    usu_email: string;

    @Expose({name: "Attendant"})
    usu_acudiente: number;

    @Expose({name: "ID_Attendant"})
    acu_id: number;

    @Expose({name: "Name_Attendant"})
    acu_nombre_completo: string;

    @Expose({name: "Phone_Attendant"})
    acu_telefono: string;

    @Expose({name: "Address_Attendant"})
    acu_direccion: string;

    constructor(data:Partial<Usuarios>){
        Object.assign(this, data)
        this.usu_id = 0
        this.usu_tipo_doc = ""
        this.usu_nombre_completo = ""
        this.usu_genero = ""
        this.usu_telefono = ""
        this.usu_direccion = ""
        this.usu_email = ""
        this.usu_acudiente = 0
        this.acu_id = 0
        this.acu_nombre_completo = ""
        this.acu_telefono = ""
        this.acu_direccion = ""
    }
}