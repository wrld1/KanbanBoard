import { Module } from '@nestjs/common';
import { BoardModule } from '../board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '../configs/database/typeorm-config';
import { BoardColumnModule } from '../board-column/board-column.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BoardModule,
    BoardColumnModule,
    CardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
