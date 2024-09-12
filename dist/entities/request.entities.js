var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resumes } from './resumes.entities.js';
let Request = class Request {
    idRequest;
    createdAt;
    urlHh;
    prompt;
    //=========== СВЯЗЬ ===========//
    resumes;
};
__decorate([
    PrimaryGeneratedColumn({ name: 'request_id' }),
    __metadata("design:type", Number)
], Request.prototype, "idRequest", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Request.prototype, "createdAt", void 0);
__decorate([
    Column({ name: 'url_hh', nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "urlHh", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "prompt", void 0);
__decorate([
    OneToMany(() => Resumes, resumes => resumes.request),
    __metadata("design:type", Object)
], Request.prototype, "resumes", void 0);
Request = __decorate([
    Entity()
], Request);
export { Request };
