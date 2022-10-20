import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { MAX_DECIMAL_FOR_ROMAN, MIN_DECIMAL_FOR_ROMAN } from '../constatns';

export class DecimalToRomanDto {
  @Min(MIN_DECIMAL_FOR_ROMAN)
  @Max(MAX_DECIMAL_FOR_ROMAN)
  @IsInt()
  @IsNotEmpty()
  decimal: number;
}
