import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class GlobalUserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp().getRequest();
    const authorizationHeader = ctx.headers.authorization;
    if (!authorizationHeader) {
      return true;
    }

    const token = authorizationHeader.split(' ')[1];
    try {
      await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Истекло время жизни токена авторизации',
        );
      }
    }

    const data: any | null = this.jwtService.decode(token);
    if (data.account?.id) {
      if (!ctx.account) {
        ctx.account = await this.adminService.getAccount(data.account.id);
      }
    }
    return true;
  }
}
