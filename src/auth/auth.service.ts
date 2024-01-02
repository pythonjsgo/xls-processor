import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import { AuthDTO } from './dto/auth.dto';
import { AdminEntity } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(data: AuthDTO) {
    const account = await this.adminRepository.findOneOrFail({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    if (!account) {
      console.log('trowing error with this', account);
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    const jwtToken = this.jwtService.sign(
      { account },
      {
        expiresIn: '30d',
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return { authorizationToken: jwtToken };
  }

  async createAccount(data: AuthDTO) {
    if (
      await this.adminRepository.findOne({
        where: {
          username: data.username,
        },
      })
    ) {
      throw new HttpException('Account already exists', HttpStatus.CONFLICT);
    }

    const admin = this.adminRepository.create({
      username: data.username,
      password: data.password,
    });

    return await this.adminRepository.save(admin);
  }
}
