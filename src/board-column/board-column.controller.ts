import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { BoardColumn } from './entities/board-column.entity';

@Controller('board-columns')
export class BoardColumnController {
  constructor(private readonly boardColumnService: BoardColumnService) {}

  @Get('board/:boardId')
  async getColumnsByBoardId(
    @Param('boardId') boardId: string,
  ): Promise<BoardColumn[]> {
    return this.boardColumnService.getColumnsByBoardId(boardId);
  }

  @Get(':id')
  async getColumnById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<BoardColumn> {
    return this.boardColumnService.getColumnById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createColumn(
    @Body() createBoardColumnDto: CreateBoardColumnDto,
  ): Promise<BoardColumn> {
    return this.boardColumnService.createColumn(createBoardColumnDto);
  }

  @Patch(':id')
  updateColumn(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBoardColumnDto: UpdateBoardColumnDto,
  ): Promise<BoardColumn> {
    return this.boardColumnService.updateColumn(id, updateBoardColumnDto);
  }

  @Delete(':id')
  deleteColumn(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.boardColumnService.deleteColumn(id);
  }
}
