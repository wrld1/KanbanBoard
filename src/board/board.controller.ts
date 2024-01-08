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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Patch(':id')
  updateBoard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  deleteBoard(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.boardService.deleteBoard(id);
  }
}
