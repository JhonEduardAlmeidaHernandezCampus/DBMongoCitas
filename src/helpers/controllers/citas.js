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
export class Citas {
    constructor(data) {
        Object.assign(this, data);
        this.ID_cita = 0;
        this.cit_fecha = "";
        this.cit_estado_cita = 0;
        this.cit_datos_medico = 0;
        this.cit_datos_usuario = 0;
    }
}
__decorate([
    Expose({ name: "ID" }),
    __metadata("design:type", Number)
], Citas.prototype, "ID_cita", void 0);
__decorate([
    Expose({ name: "Date" }),
    __metadata("design:type", String)
], Citas.prototype, "cit_fecha", void 0);
__decorate([
    Expose({ name: "Status" }),
    __metadata("design:type", Number)
], Citas.prototype, "cit_estado_cita", void 0);
__decorate([
    Expose({ name: "Data_Doctor" }),
    __metadata("design:type", Number)
], Citas.prototype, "cit_datos_medico", void 0);
__decorate([
    Expose({ name: "Data_User" }),
    __metadata("design:type", Number)
], Citas.prototype, "cit_datos_usuario", void 0);
