import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordForm, ForgotPasswordForm, RegisterForm } from './forms';
import { JwtAuthGuard } from './guards';
import { UserDetailsDto } from './dtos';
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
    message: 'Forgot password successfully'
  })
  @Post('forgot-password')
  async forgotPassword(@Body() form: ForgotPasswordForm) {
    return await this.authService.forgotPassword(form);
  }

  @ApiResponseNoData({
    message: 'Change password successfully'
  })
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Req() req, @Body() form: ChangePasswordForm) {
    const user: UserDetailsDto = req.user;
    return await this.authService.changePassword(user.id, form);
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
