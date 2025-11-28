import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3004
    },
  });
  await app.startAllMicroservices()
}
bootstrap();
