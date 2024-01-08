import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { BoardColumnModule } from 'src/board-column/board-column.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), BoardColumnModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
