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

  @Column({
    type: 'int',
    nullable: false,
  })
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  board: Board;

  @OneToMany(() => Card, (card) => card.column, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cards: Card[];
}
