import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE } from '@app/common';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClientsModule.registerAsync([
    {
      name: NOTIFICATIONS_SERVICE,
      useFactory: (configService: ConfigService) => {
        return {
          tranport: Transport.TCP,
          options: {
            host: configService.getOrThrow('NOTIFICATIONS_HOST'),
            port: configService.getOrThrow('NOTIFICATIONS_PORT'),
          },
        }
      },
      inject: [ConfigService]
    },
  ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule { }
