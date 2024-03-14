import { Doggo } from 'src/doggos/doggo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Kennel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @OneToMany(() => Doggo, (doggo) => doggo.kennelId)
  doggos: Doggo[];
  photos: any;
}
