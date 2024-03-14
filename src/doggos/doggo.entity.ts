import { Kennel } from 'src/kennels/kennel.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Doggo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  race: string;

  @Column()
  name: string;

  @ManyToOne(() => Kennel, (kennel) => kennel.doggos)
  kennelId: number;
}
