import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resumes } from './resumes.entities.js';

@Entity()
export class Request {
   @PrimaryGeneratedColumn({ name: 'request_id' })
   id: number;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @Column({ name: 'url_hh', nullable: true })
   urlHh: string;

   @Column({ nullable: true })
   prompt: string;

   //=========== СВЯЗЬ ===========//

   @OneToMany(() => Resumes, resumes => resumes.request)
   resumes: Resumes[];
}
