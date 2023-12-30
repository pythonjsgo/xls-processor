import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XlsProcessorService } from './xls-processor.service';

@Controller('xls-processor')
export class XlsProcessorController {
  constructor(private readonly xlsProcessorService: XlsProcessorService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    this.xlsProcessorService.processFile(file);
    return { originalname: file.originalname, filename: file.filename };
  }
}
