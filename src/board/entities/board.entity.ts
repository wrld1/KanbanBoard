import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CoreEntity } from '../../application/entities/core.entity';
import { BoardColumn } from '../../board-column/entities/board-column.entity';

@Entity({ name: 'board' })
export class Board extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  columns: BoardColumn[];
}
