import { IsNumberString, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AppEnvs } from '../../application/enums';

export class ConfigDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(AppEnvs)
  APP_ENV: AppEnvs;

  @IsNotEmpty()
  @IsNumberString()
  PORT: number;

  @IsNotEmpty()
  @IsNumberString()
  POSTGRES_PORT: number;

  @IsNotEmpty()
  @IsString()
  POSTGRES_HOST: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_USER: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_DATABASE: string;
}
