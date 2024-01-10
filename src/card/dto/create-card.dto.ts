import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @Length(1, 255, { message: 'The title length should be between 1 and 255' })
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @Length(5, 255, {
    message: 'The description length should be between 5 and 255',
  })
  description?: string;

  @IsString()
  columnId: string;
}
