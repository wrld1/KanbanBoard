import { IsNotEmpty, Length } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @Length(3, 255, { message: 'The name length should be between 3 and 255' })
  name: string;
}
