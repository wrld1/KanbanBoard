import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardColumn } from 'src/board-column/entities/board-column.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
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

    const todoColumn = this.columnRepository.create({
      name: 'ToDo',
      board: { id: board.id },
    });

    const inProgressColumn = this.columnRepository.create({
      name: 'In Progress',
      board: { id: board.id },
    });

    const doneColumn = this.columnRepository.create({
      name: 'Done',
      board: { id: board.id },
    });

    await this.columnRepository.save([
      todoColumn,
      inProgressColumn,
      doneColumn,
    ]);

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
