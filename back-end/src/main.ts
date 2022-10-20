import { NestFactory } from '@nestjs/core';
import { configureApp } from './core/utils/configs.util';
import { MathModule } from './math/math.module';

async function bootstrap() {
  const app = await NestFactory.create(MathModule);

  configureApp(app);

  await app.listen(3000);
}
bootstrap();
