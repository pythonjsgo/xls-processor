import { Controller, Get, Param } from '@nestjs/common';
import {TaskQueueService} from "./task-queue.service";

@Controller('task')
export class TaskQueueController {
  constructor(private readonly taskQueueService: TaskQueueService) {}


  @Get('list')
  async getList() {
    return this.taskQueueService.getAllJobsWithStatus()
  }
  @Get(':id')
  async getJob(@Param('id') id: string){
      return this.taskQueueService.getJob(parseInt(id))
  }

}
