import { Body, Controller, Post } from '@nestjs/common';
import { ConvertDecimalToRomanDto } from '../dtos/convertDecimalToRoman.dto';
import { convertDecimalToRoman } from '../utils/math.util';

@Controller('/api/math')
export class MathController {
  @Post('decimal-to-roman')
  async decimalToRoman(@Body() { decimal }: ConvertDecimalToRomanDto) {
    const roman = convertDecimalToRoman(decimal);

    return {
      result: {
        decimal,
        roman,
      },
    };
  }
}
