import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { XlsFileEntity } from './entities/xls-file.entity';
import { XlsFileInterface } from './interfaces/xls-file.interface';

@Injectable()
export class XlsProcessorService {
  constructor(
    @InjectRepository(XlsFileEntity)
    private readonly xlsFileRepository: Repository<XlsFileEntity>,
  ) {}
  async processFile(file) {
    const xlsFile = this.xlsFileRepository.create({
      originalName: file.originalname,
      filename: file.filename,
    });

    return this.xlsFileRepository.save(xlsFile);
  }
}
