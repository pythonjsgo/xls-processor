import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskQueueService } from './task-queue.service';
import {ClientProxy, ClientProxyFactory, ClientsModule, Transport} from '@nestjs/microservices';
import {TaskQueueController} from "./task-queue.controller";
import {BullModule} from "@nestjs/bull";
import {QueueProcessor} from "./task-queue.processor";

@Module({
  imports: [
      ConfigModule,
      BullModule.registerQueue({
          name: 'tasks'
      }),
      ClientsModule
  ],
  controllers: [TaskQueueController],

  // @ts-ignore
  providers: [ConfigService, ClientProxy, TaskQueueService, QueueProcessor],
  exports: [BullModule, TaskQueueService, ConfigModule, ClientProxy],
})
export class TaskQueueModule {}
