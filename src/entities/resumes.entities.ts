import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Request } from './request.entities.js';

@Entity()
export class Resumes {
   @PrimaryGeneratedColumn({ name: 'resume_id' })
   idResume: number;

   @Column({ name: 'resume_hh_id', nullable: true })
   idResumeHh: string;

   @Column({ name: 'resume_url', nullable: true })
   urlResume: string;

   @Column({ name: 'first_name', nullable: true })
   firstName: string;

   @Column({ name: 'last_name', nullable: true })
   lastName: string;

   @Column({ name: 'middle_name', nullable: true })
   middleName: string;

   @Column({ nullable: true })
   age: number;

   @Column({ nullable: true })
   title: string;

   @Column({ name: 'total_experience', nullable: true })
   totalExperience: number;

   @Column({ nullable: true })
   scoreball: number;

   //=========== СВЯЗЬ ===========//

   @ManyToOne(() => Request, request => request.resumes, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'request_id' })
   request: Request;
}
