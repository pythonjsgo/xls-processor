import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XlsFileInterface } from '../../xls-processor/interfaces/xls-file.interface';
import { UUID } from '@common/types';
import { AdminInterface } from '../interfaces/admin.interface';

@Entity('admin')
export class AdminEntity implements AdminInterface {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  username: string;

  @Column()
  password: string;
}
