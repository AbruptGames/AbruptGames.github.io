import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail, IsIn } from 'class-validator';
  
@Entity()
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Column()
    newsletter: boolean;
    
    @IsIn(['english', 'french'])
    @Column()
    language: string;
    
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    dateOfSubscription: Date;
}