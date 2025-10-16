import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterForm } from './forms';
import { ApiResponseNoData } from '@/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponseNoData({
    message: 'Register successfully'
  })
  @Post('register')
  async register(@Body() form: RegisterForm) {
    return await this.authService.register(form);
  }

  @ApiResponseNoData({
    message: 'Login successfully'
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
