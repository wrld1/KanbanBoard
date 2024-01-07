import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from '../../application/entities/core.entity';
import { Board } from '../../board/entities/board.entity';
import { Card } from '../../card/entities/card.entity';

@Entity({ name: 'boardColumn' })
export class BoardColumn extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Board, (board) => board.columns, {
    nullable: false,
  })
  board: Board;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
