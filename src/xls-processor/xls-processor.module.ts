import { Module } from '@nestjs/common';
import { XlsProcessorController } from './xls-processor.controller';
import { XlsProcessorService } from './xls-processor.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XlsFileEntity } from './entities/xls-file.entity';
import { TaskQueueService } from '../task-queue/task-queue.service';
import {TaskQueueModule} from "../task-queue/task-queue.module";
import {JwtAuthGuard} from "../admin/guards/jwt-аuthorization.guard";
import {JwtService} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {BullModule} from "@nestjs/bull";

@Module({
  imports: [
    MulterModule.register(multerOptions),
    TypeOrmModule.forFeature([XlsFileEntity]),
    TaskQueueModule,
      ConfigModule,
  ],
  controllers: [XlsProcessorController],
  providers: [XlsProcessorService, TaskQueueService, JwtService, JwtAuthGuard],
})
export class XlsProcessorModule {}
