import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/global-exceptions';

async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter())
  
  await app.listen(PORT, () => {
    console.log(`The service is listening on port ${PORT}`)
  });
}

bootstrap();
