import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Войти в аккаунт' })
  async login(
    @Body()
    data: AuthDTO,
  ) {
    return await this.authService.login(data);
  }

  @Post('registration')
  @ApiOperation({ summary: 'Создать аккаунт' })
  async registration(
    @Body()
    data: AuthDTO,
  ) {
    await this.authService.createAccount(data);
    return await this.authService.login(data);
  }

  @Get('check-authorization')
  async checkAuthorization() {
    return true;
  }
}
