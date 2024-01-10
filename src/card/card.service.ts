import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { BoardColumnService } from 'src/board-column/board-column.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly boardColumnService: BoardColumnService,
  ) {}

  async getAllCards(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async getCardById(id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: {
        id,
      },
      relations: ['column'],
    });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { title, description, columnId } = createCardDto;

    const boardColumn = await this.boardColumnService.getColumnById(columnId);

    if (!boardColumn) {
      throw new NotFoundException(`BoardColumn with ID ${columnId} not found`);
    }

    const card = this.cardRepository.create({
      title,
      description,
      column: boardColumn,
    });

    return this.cardRepository.save(card);
  }

  async updateCard(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.getCardById(id);
    const updatedCard = { ...card, ...updateCardDto };
    return this.cardRepository.save(updatedCard);
  }

  async updateCardColumn(id: string, columnId: string): Promise<Card> {
    const card = await this.getCardById(id);

    const newColumn = await this.boardColumnService.getColumnById(columnId);

    if (!newColumn) {
      throw new NotFoundException('BoardColumn with ID ${columnId} not found');
    }

    card.column = newColumn;

    return this.cardRepository.save(card);
  }

  async deleteCard(id: string): Promise<void> {
    const card = await this.getCardById(id);
    await this.cardRepository.remove(card);
  }
}
