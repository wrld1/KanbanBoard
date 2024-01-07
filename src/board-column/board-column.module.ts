import { Module } from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { BoardColumnController } from './board-column.controller';

@Module({
  controllers: [BoardColumnController],
  providers: [BoardColumnService],
})
export class BoardColumnModule {}
