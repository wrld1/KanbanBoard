import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CoreEntity } from '../../application/entities/core.entity';

@Entity({ name: 'courses' })
export class Board extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;
}
