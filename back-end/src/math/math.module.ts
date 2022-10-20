import { Module } from '@nestjs/common';
import { MathController } from './controllers/math.controller';

@Module({
  controllers: [MathController],
})
export class MathModule {}
