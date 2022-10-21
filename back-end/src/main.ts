import { NestFactory } from '@nestjs/core';
import { configureApp } from './math/utils/configs.util';
import { MathModule } from './math/math.module';

async function bootstrap() {
  const app = await NestFactory.create(MathModule);

  configureApp(app);

  await app.listen(process.env.port || 3000);
}
bootstrap();
