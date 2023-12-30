import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthInterface } from '../interfaces/auth.interface';

export class AuthDTO implements AuthInterface {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
  email: string;
}
