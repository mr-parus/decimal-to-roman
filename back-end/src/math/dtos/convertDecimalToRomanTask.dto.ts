import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { MAX_ROMAN_IN_DECIMAL, MIN_ROMAN_IN_DECIMAL } from '../constatns';

export class ConvertDecimalToRomanTaskDto {
  @Min(MIN_ROMAN_IN_DECIMAL)
  @Max(MAX_ROMAN_IN_DECIMAL)
  @IsInt()
  @IsNotEmpty()
  decimal: number;

  @IsString()
  @IsNotEmpty()
  clientId: string;
}
