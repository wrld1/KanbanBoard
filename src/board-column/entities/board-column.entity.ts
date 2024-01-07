import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from '../../application/entities/core.entity';
import { Board } from '../../board/entities/board.entity';

@Entity({ name: 'boardColumn' })
export class BoardColumn extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Board, (board) => board.columns)
  board: Board;
}
