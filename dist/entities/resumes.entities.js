var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entities.js';
let Resumes = class Resumes {
    id;
    idResumeHh;
    firstName;
    lastName;
    middleName;
    age;
    title;
    totalExperience;
    scoreball;
    //=========== СВЯЗЬ ===========//
    request;
};
__decorate([
    PrimaryGeneratedColumn({ name: 'rusume_id' }),
    __metadata("design:type", Number)
], Resumes.prototype, "id", void 0);
__decorate([
    Column({ name: 'resume_hh_id' }),
    __metadata("design:type", String)
], Resumes.prototype, "idResumeHh", void 0);
__decorate([
    Column({ name: 'first_name', nullable: true }),
    __metadata("design:type", String)
], Resumes.prototype, "firstName", void 0);
__decorate([
    Column({ name: 'last_name', nullable: true }),
    __metadata("design:type", String)
], Resumes.prototype, "lastName", void 0);
__decorate([
    Column({ name: 'middle_name', nullable: true }),
    __metadata("design:type", String)
], Resumes.prototype, "middleName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Resumes.prototype, "age", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Resumes.prototype, "title", void 0);
__decorate([
    Column({ name: 'total_experience', nullable: true }),
    __metadata("design:type", Number)
], Resumes.prototype, "totalExperience", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Resumes.prototype, "scoreball", void 0);
__decorate([
    ManyToOne(() => Request, request => request.resumes, { nullable: true }),
    JoinColumn({ name: 'request_id' }),
    __metadata("design:type", Request)
], Resumes.prototype, "request", void 0);
Resumes = __decorate([
    Entity()
], Resumes);
export { Resumes };
