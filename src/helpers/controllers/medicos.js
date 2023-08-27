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
export class Medicos {
    constructor(data) {
        Object.assign(this, data);
        this.med_num_matricula = 0;
        this.med_nombre_completo = "";
        this.med_especialidad = "";
        this.nom_especialidad = "";
        this.med_consultorio = "";
        this.nom_consultorio = "";
    }
}
__decorate([
    Expose({ name: "ID_License" }),
    __metadata("design:type", Number)
], Medicos.prototype, "med_num_matricula", void 0);
__decorate([
    Expose({ name: "Name" }),
    __metadata("design:type", String)
], Medicos.prototype, "med_nombre_completo", void 0);
__decorate([
    Expose({ name: "Speciality" }),
    __metadata("design:type", String)
], Medicos.prototype, "med_especialidad", void 0);
__decorate([
    Expose({ name: "Name_Speciality" }),
    __metadata("design:type", String)
], Medicos.prototype, "nom_especialidad", void 0);
__decorate([
    Expose({ name: "Office" }),
    __metadata("design:type", String)
], Medicos.prototype, "med_consultorio", void 0);
__decorate([
    Expose({ name: "Name_Office" }),
    __metadata("design:type", String)
], Medicos.prototype, "nom_consultorio", void 0);
