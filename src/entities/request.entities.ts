import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Resumes } from './resumes.entities.js';

@Entity()
export class Request {
   @PrimaryGeneratedColumn({ name: 'request_id' })
   idRequest: number;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @Column({ name: 'url_hh', nullable: true })
   urlHh: string;

   @Column({ nullable: true })
   prompt: string;

   //=========== СВЯЗЬ ===========//

   @OneToMany(() => Resumes, resumes => resumes.request)
   resumes: Relation<Resumes[]>; 
}
