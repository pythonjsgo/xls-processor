import { Module } from '@nestjs/common';
import { XlsProcessorController } from './xls-processor.controller';
import { XlsProcessorService } from './xls-processor.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XlsFileEntity } from './entities/xls-file.entity';

@Module({
  imports: [
    MulterModule.register(multerOptions),
    TypeOrmModule.forFeature([XlsFileEntity]),
  ],
  controllers: [XlsProcessorController],
  providers: [XlsProcessorService],
})
export class XlsProcessorModule {}
