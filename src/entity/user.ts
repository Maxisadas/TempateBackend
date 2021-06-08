import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, default: null })
  nombreUsuario: string;
  @Column({ nullable: true, default: null })
  constrasena: string;
  @Column({ nullable: true, default: null })
  fechaCreacion: Date;
  @Column({ nullable: true, default: null })
  fechaBaja: Date;
}
