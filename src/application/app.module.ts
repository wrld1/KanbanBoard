import { Module } from '@nestjs/common';
import { BoardModule } from '../board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/configs/database/typeorm-config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
