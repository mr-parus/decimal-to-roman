import { Body, Controller, Post } from '@nestjs/common';
import { DecimalToRomanDto } from '../dtos/decimalToRoman.dto';
import { convertDecimalToRoman } from '../utils/math.util';

@Controller('/api/math')
export class MathController {
  @Post('decimal-to-roman')
  async decimalToRoman(@Body() { decimal }: DecimalToRomanDto) {
    const roman = convertDecimalToRoman(decimal);

    return {
      result: {
        decimal,
        roman,
      },
    };
  }
}
