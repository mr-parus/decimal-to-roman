import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { MAX_ROMAN_IN_DECIMAL, MIN_ROMAN_IN_DECIMAL } from '../constatns';

export class ConvertDecimalToRomanDto {
  @Min(MIN_ROMAN_IN_DECIMAL)
  @Max(MAX_ROMAN_IN_DECIMAL)
  @IsInt()
  @IsNotEmpty()
  decimal: number;
}
