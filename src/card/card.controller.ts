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
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getAllCards(): Promise<Card[]> {
    return this.cardService.getAllCards();
  }

  @Get(':id')
  async getCardById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Card> {
    return this.cardService.getCardById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.createCard(createCardDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardService.updateCard(id, updateCardDto);
  }

  @Patch(':id/update-column')
  async updateCardColumn(
    @Param('id', new ParseUUIDPipe()) cardId: string,
    @Body('newColumnId') newColumnId: string,
  ): Promise<any> {
    try {
      const updatedCard = await this.cardService.updateCardColumn(
        cardId,
        newColumnId,
      );
      return { success: true, data: updatedCard };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.cardService.deleteCard(id);
  }
}
