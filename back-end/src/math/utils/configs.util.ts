import { INestApplication, ValidationPipe } from '@nestjs/common';

function useValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

export function configureApp(app: INestApplication): void {
  app.enableCors();
  useValidationPipe(app);
}
