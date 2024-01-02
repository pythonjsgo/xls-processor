import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import * as xlsx from 'xlsx'


@Processor('tasks')
export class QueueProcessor {
    constructor(
        private readonly client: ClientProxy,
        private readonly configService: ConfigService,
        ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBIT_MQ')], // Change to your RabbitMQ URL
                queue: this.configService.get('RABBIT_MQ_QUEUE'),
            },
        });
    }
    @Process()
    handleJob(job: Job<any>) {
        const message =  (this.client.send({cmd: 'processXlsFile'}, job.data).toPromise()).then(console.log).catch(console.log)
        console.log(`Message sent: ${message}`);
    }
}