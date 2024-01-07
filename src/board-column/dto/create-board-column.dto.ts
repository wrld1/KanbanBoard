import { IsString, Length } from 'class-validator';

export class CreateBoardColumnDto {
  @IsString()
  @Length(1, 255, { message: 'The name length should be between 1 and 255' })
  name: string;

  @IsString()
  boardId: string;
}
