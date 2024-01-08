import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { BoardColumn } from './entities/board-column.entity';

@Injectable()
export class BoardColumnService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) {}

  async getColumnsByBoardId(boardId: string): Promise<BoardColumn[]> {
    const board = await this.columnRepository.find({
      where: {
        board: { id: boardId },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    return board;
  }

  async getColumnById(id: string): Promise<BoardColumn> {
    const column = await this.columnRepository.findOne({
      where: {
        id,
      },
      relations: ['board', 'cards'],
    });
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    return column;
  }

  async createColumn(
    createBoardColumnDto: CreateBoardColumnDto,
  ): Promise<BoardColumn> {
    const column = this.columnRepository.create({
      name: createBoardColumnDto.name,
      board: { id: createBoardColumnDto.boardId },
    });
    return this.columnRepository.save(column);
  }

  async updateColumn(
    id: string,
    updateBoardColumnDto: UpdateBoardColumnDto,
  ): Promise<BoardColumn> {
    const column = await this.getColumnById(id);
    return this.columnRepository.save({ ...column, ...updateBoardColumnDto });
  }

  async deleteColumn(id: string): Promise<void> {
    const column = await this.getColumnById(id);
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    await this.columnRepository.remove(column);
  }
}
