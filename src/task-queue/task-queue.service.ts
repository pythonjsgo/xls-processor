import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory, MessagePattern,
  Transport,
} from '@nestjs/microservices';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import {Observable} from "rxjs";
import {InjectQueue} from "@nestjs/bull";
import {JobStatus, Queue } from 'bull';
import * as xlsx from 'xlsx'

@Injectable()
export class TaskQueueService {
  constructor(
      @InjectQueue('tasks') private readonly queue: Queue
  ) {
  }

  async addMessageToQueue(file) {
    file.buffer = file.buffer.toString('base64')
    await this.queue.add(file)
    console.log(await this.queue.count())
  }



  async getAllJobsWithStatus() {
    const jobTypes: JobStatus[] = ['waiting', 'active', 'completed', 'failed', 'delayed', 'paused'];
    const allJobs = [];

    for (const type of jobTypes) {
      const jobs = await this.queue.getJobs([type]);
      allJobs.push(...(await Promise.all(jobs.map(async job => ({
        id: job.id,
        status: await job.getState()
      })))));
    }
    //return JSON.stringify(allJobs, null, 2);
    return allJobs
  }

  async getJob(id: number) {
    return await this.queue.getJob(id)
  }
}

  // @MessagePattern({cmd: 'xlsFileProcessed'})
  // async xlsFileProcessed(data: Buffer) {
  //   console.log(data, 'proceessed file recieved')
  // }
