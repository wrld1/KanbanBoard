import { IsNotEmpty, Length } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @Length(5, 255, { message: 'The name length should be between 5 and 255' })
  name: string;
}
