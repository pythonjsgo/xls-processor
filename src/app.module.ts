import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XlsProcessorModule } from './xls-processor/xls-processor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XlsFileEntity } from './xls-processor/entities/xls-file.entity';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AdminEntity} from "./admin/entities/admin.entity";
import {BullModule} from "@nestjs/bull";
import {TaskQueueModule} from "./task-queue/task-queue.module";
import {QueueProcessor} from "./task-queue/task-queue.processor";
import {TaskQueueService} from "./task-queue/task-queue.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'tasks',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: configService.get('PG_PORT'),
          username: configService.get('PG_USERNAME'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DBNAME'),
          entities: [XlsFileEntity, AdminEntity],
          synchronize: true,
        };
      },
      inject: [ConfigService],

    }),

    XlsProcessorModule,
    AdminModule,
    AuthModule,
    TaskQueueModule,
    ClientsModule.register([
      {
        name: 'XLS_PROCESSOR', // This name is used to identify the microservice
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://0.0.0.0:5672'], // RabbitMQ server URL
          queue: 'xls-file-queue',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
