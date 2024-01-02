import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminInterface } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async getAccount(accountId: AdminInterface['id']) {
    const admin = await this.adminRepository.findOneOrFail({
      where: { id: accountId },
    });
    return admin;
  }
}
