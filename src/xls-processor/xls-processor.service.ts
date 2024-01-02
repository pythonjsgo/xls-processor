import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { XlsFileEntity } from './entities/xls-file.entity';
import { XlsFileInterface } from './interfaces/xls-file.interface';
import { TaskQueueService } from '../task-queue/task-queue.service';
import {Observable} from "rxjs";

@Injectable()
export class XlsProcessorService {
  constructor(
      @InjectRepository(XlsFileEntity)
      private readonly xlsFileRepository: Repository<XlsFileEntity>,
    private readonly taskQueueService: TaskQueueService,
  ) {}
  async processFile(file) {
    // const xlsFile = this.xlsFileRepository.create({
    //   originalName: file.originalname,
    //   filename: file.filename,
    // });
    // this.xlsFileRepository.save(xlsFile);


    await this.taskQueueService.addMessageToQueue(file);
  }
}
