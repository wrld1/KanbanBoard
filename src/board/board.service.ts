import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardColumnService } from 'src/board-column/board-column.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly boardColumnService: BoardColumnService,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find({
      relations: ['columns', 'columns.cards'],
    });
  }

  async getBoardById(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        columns: true,
      },
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create({ ...createBoardDto });

    await this.boardRepository.save(board);

    await this.boardColumnService.createColumn({
      name: 'ToDo',
      boardId: board.id,
    });
    await this.boardColumnService.createColumn({
      name: 'In Progress',
      boardId: board.id,
    });
    await this.boardColumnService.createColumn({
      name: 'Done',
      boardId: board.id,
    });

    return this.getBoardById(board.id);
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.getBoardById(id);
    board.name = updateBoardDto.name;
    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: string): Promise<void> {
    const board = await this.getBoardById(id);
    await this.boardRepository.remove(board);
  }
}
