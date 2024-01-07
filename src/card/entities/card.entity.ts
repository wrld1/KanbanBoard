import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../application/entities/core.entity';
import { BoardColumn } from '../../board-column/entities/board-column.entity';

@Entity({ name: 'card' })
export class Card extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.cards, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  column: BoardColumn;
}
