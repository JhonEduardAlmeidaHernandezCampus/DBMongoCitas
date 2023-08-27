var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
export class Usuarios {
    constructor(data) {
        Object.assign(this, data);
        this.usu_id = 0;
        this.usu_tipo_doc = "";
        this.usu_nombre_completo = "";
        this.usu_genero = "";
        this.usu_telefono = "";
        this.usu_direccion = "";
        this.usu_email = "";
        this.usu_acudiente = 0;
        this.acu_id = 0;
        this.acu_nombre_completo = "";
        this.acu_telefono = "";
        this.acu_direccion = "";
    }
}
__decorate([
    Expose({ name: "ID" }),
    __metadata("design:type", Number)
], Usuarios.prototype, "usu_id", void 0);
__decorate([
    Expose({ name: "Tipo_Doc" }),
    __metadata("design:type", String)
], Usuarios.prototype, "usu_tipo_doc", void 0);
__decorate([
    Expose({ name: "Name" }),
    __metadata("design:type", String)
], Usuarios.prototype, "usu_nombre_completo", void 0);
__decorate([
    Expose({ name: "Gender" }),
    __metadata("design:type", String)
], Usuarios.prototype, "usu_genero", void 0);
__decorate([
    Expose({ name: "Phone" }),
    __metadata("design:type", String)
], Usuarios.prototype, "usu_telefono", void 0);
__decorate([
    Expose({ name: "Address" }),
    __metadata("design:type", String)
], Usuarios.prototype, "usu_direccion", void 0);
__decorate([
    Expose({ name: "Email" }),
    __metadata("design:type", String)
], Usuarios.prototype, "usu_email", void 0);
__decorate([
    Expose({ name: "Attendant" }),
    __metadata("design:type", Number)
], Usuarios.prototype, "usu_acudiente", void 0);
__decorate([
    Expose({ name: "ID_Attendant" }),
    __metadata("design:type", Number)
], Usuarios.prototype, "acu_id", void 0);
__decorate([
    Expose({ name: "Name_Attendant" }),
    __metadata("design:type", String)
], Usuarios.prototype, "acu_nombre_completo", void 0);
__decorate([
    Expose({ name: "Phone_Attendant" }),
    __metadata("design:type", String)
], Usuarios.prototype, "acu_telefono", void 0);
__decorate([
    Expose({ name: "Address_Attendant" }),
    __metadata("design:type", String)
], Usuarios.prototype, "acu_direccion", void 0);
