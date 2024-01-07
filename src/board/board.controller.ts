import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoards() {
    return this.boardService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.boardService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Patch(':id')
  updateBoard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  deleteBoard(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.boardService.deleteBoard(id);
  }
}
