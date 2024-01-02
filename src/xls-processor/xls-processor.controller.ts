import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XlsProcessorService } from './xls-processor.service';
import * as fs from "fs";
import {JwtAuthGuard} from "../admin/guards/jwt-аuthorization.guard";
import * as xlsx from "xlsx";

@Controller('xls-processor')
export class XlsProcessorController {
  constructor(private readonly xlsProcessorService: XlsProcessorService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    file.buffer = fs.readFileSync(`./${file.path}`)

    this.xlsProcessorService.processFile(file);
    return { originalname: file.originalname, filename: file.filename };
  }


}
